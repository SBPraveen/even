const { app, BrowserWindow, ipcMain, clipboard } = require('electron')
const url = require('url')
const path = require('path')
const { startServer, connectServer, sendMessage, stopServer } = require('./back-end-app/create-websocket-server')
const windowStateKeeper = require('electron-window-state');
const { processAsyncAPIDocument } = require('./back-end-app/schema-registry');
const { getDocument } = require('./back-end-app/schema-registry/sqlite');

/**
 * Creates the main application window.
 * @param {Object} mainWindowState - The state of the main window.
 * @returns {BrowserWindow} - The created BrowserWindow instance.
 */
const createWindow = (mainWindowState) => {
    const win = new BrowserWindow({
        height: mainWindowState.height,
        title: 'even',
        webPreferences: {
            contextIsolation: true,
            icon: path.join(__dirname, 'assets', 'even_icon.png'),
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false,
        },
        width: mainWindowState.width,
        x: mainWindowState.x,
        y: mainWindowState.y,
    })
    win.webContents.openDevTools()
    win.setMenuBarVisibility(false);
    const startUrl = url.format({
        pathname: path.join(__dirname, './front-end-app/build/index.html'),
        protocol: 'file'
    })
    win.loadURL(startUrl)
    ipcMain.on('startWebSocketServer', (event, data) => startServer(data, win))
    ipcMain.on('connectWebSocketServer', (event, data) => connectServer(data, win))
    ipcMain.on('stopServer', () => stopServer())
    ipcMain.on('wssSendMsg', (event, data) => sendMessage(data))
    ipcMain.on('copyToClipBoard', (event, data) => clipboard.writeText(data))
    ipcMain.handle('schemaRegister', async (event, route) => {
        const key = await processAsyncAPIDocument(route);
        return key
    })
    ipcMain.handle('getSchemaValues', async (event, key) => {
        const data = await getDocument(key)
        return data
    })
    ipcMain.handle('fileSystemAccess', async () => {
        const result = await dialog.showOpenDialog({
            properties: ['openDirectory'],
        });
        return result.filePaths;
    })
    return win
}

app.whenReady().then(async () => {
    let win
    const mainWindowState = windowStateKeeper({
        defaultHeight: 1080,
        defaultWidth: 1920,
    });
    win = createWindow(mainWindowState)
    const filePath = '../../Unifo/backend/Wss/wss-v2/async-api-template/asyncapi.json';
    await processAsyncAPIDocument(filePath);
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            win = createWindow(mainWindowState)
        }
    })
    mainWindowState.manage(win);
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
