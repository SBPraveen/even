const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const { startServer, connectServer, sendMessage } = require('./back-end-app/createWebsocketServer/')

const createWindow = () => {
    const win = new BrowserWindow({
        title: 'even',
        width: 1920,
        height: 1080,
        webPreferences: {
            contextIsolation: true,
            webSecurity: false,
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
            icon: path.join(__dirname, 'assets', 'even_icon.png') 
        }
    })
    win.webContents.openDevTools()
    win.setMenuBarVisibility(false);
    const startUrl = url.format({
        pathname: path.join(__dirname, './front-end-app/build/index.html'),
        protocol: 'file'
    })
    win.loadURL(startUrl)
    ipcMain.on("startWebSocketServer", (event, data) => startServer(data, win))
    ipcMain.on("connectWebSocketServer", (event, data) => connectServer(data, win))
    ipcMain.on("wssSendMsg", (event, data) => sendMessage(data))
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
