const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        title: 'even',
        width: 1920,
        height: 1080,
        webPreferences:{
            webSecurity:false
        }
    })
    win.webContents.openDevTools()
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