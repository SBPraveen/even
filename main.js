const { app, BrowserWindow, ipcMain, clipboard } = require('electron')
const url = require('url')
const path = require('path')
const startServer = require('./back-end-app/createWebsocketServer/startServer')
const connectToServer = require('./back-end-app/createWebsocketServer/connectToServer')

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
    mainsession = win.webContents.session
    win.webContents.openDevTools()
    win.setMenuBarVisibility(false);
    const startUrl = url.format({
        pathname: path.join(__dirname, './front-end-app/build/index.html'),
        protocol: 'file'
    })
    win.loadURL(startUrl)
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

ipcMain.on("startWebSocketServer", (event, data) => startServer(data))
ipcMain.on("copyToClipBoard", (event, data) => clipboard.writeText(data))
ipcMain.on("setCookies", async (event, cookie) => {
    const { cookieName, cookieValue, cookieDomain } = cookie;
    try {
        await mainsession.cookies.set({
            name: cookieName,
            value: cookieValue,
            domain: cookieDomain,
            sameSite: 'no_restriction',
            httpOnly: true,
            secure: true,
            url: `https://${cookieDomain}`
        });
    } catch (error) {
        console.error(`Error setting cookie ${cookieName}:`, error);
    }
})
ipcMain.on('connectToServer', async (event, url) => {
    try {
        const cookies = await mainsession.cookies.get({});
        connectToServer(url, cookies)
    } catch (error) {
        console.error("Error getting cookies:", error);
    }
})