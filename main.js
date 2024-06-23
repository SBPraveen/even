const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const { startServer, connectServer, sendMessage } = require('./back-end-app/createWebsocketServer/')
const windowStateKeeper = require('electron-window-state');


const createWindow = (mainWindowState) => {
    const win = new BrowserWindow({
        title: 'even',
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        webPreferences: {
            contextIsolation: true,
            webSecurity: false,
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
            icon: path.join(__dirname, 'assets', 'even_icon.png') 
        }
    })
    // win.webContents.openDevTools()
    win.setMenuBarVisibility(false);
    const startUrl = url.format({
        pathname: path.join(__dirname, './front-end-app/build/index.html'),
        protocol: 'file'
    })
    win.loadURL(startUrl)
    ipcMain.on("startWebSocketServer", (event, data) => startServer(data, win))
    ipcMain.on("connectWebSocketServer", (event, data) => connectServer(data, win))
    ipcMain.on("wssSendMsg", (event, data) => sendMessage(data))
    return win
}

app.whenReady().then(() => {
    let win
    let mainWindowState = windowStateKeeper({
    defaultWidth: 1920,
    defaultHeight: 1080
  });
    win = createWindow(mainWindowState)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            win = createWindow(mainWindowState)
        }
    })
    mainWindowState.manage(win);
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
