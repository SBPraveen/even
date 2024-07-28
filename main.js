const { app, BrowserWindow, ipcMain, clipboard, dialog } = require("electron")
const url = require("url")
const path = require("path")
const {
  startServer,
  connectServer,
  sendMessage,
  stopServer,
} = require("./back-end-app/createWebsocketServer/")
const {producerSendMessage,kafkaReceiveMsg} = require('./back-end-app/kafka-server/')
const windowStateKeeper = require("electron-window-state")

const createWindow = (mainWindowState) => {
  const win = new BrowserWindow({
    title: "even",
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      contextIsolation: true,
      webSecurity: false,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      icon: path.join(__dirname, "assets", "even_icon.png"),
    },
  })
  win.webContents.openDevTools()
  win.setMenuBarVisibility(false)
  const startUrl = url.format({
    pathname: path.join(__dirname, "./front-end-app/build/index.html"),
    protocol: "file",
  })
  win.loadURL(startUrl)
  ipcMain.handle("startWebSocketServer", async (event, data) => {
    return startServer(data, win)
  })
  ipcMain.on("connectWebSocketServer", (event, data) =>
    connectServer(data, win)
  )
  ipcMain.on("stopServer", (event) => stopServer())
  ipcMain.on("wssSendMsg", (event, data) => sendMessage(data))
  ipcMain.on("kafkaSendMsg", (event, data) => producerSendMessage(data))
  ipcMain.on("kafkaConsumerStarter", (event) => kafkaReceiveMsg(win))
  ipcMain.on("copyToClipBoard", (event, data) => clipboard.writeText(data))
  ipcMain.handle("fileSystemAccess", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    })
    return result.filePaths
  })
  ipcMain.handle("getTitle", async () => {
    return win.getTitle()
  })
  ipcMain.handle("kafkaProducer", async () => {
    const newWin = new BrowserWindow({
      title: "producer",
      x: mainWindowState.x,
      y: mainWindowState.y,
      width: mainWindowState.width,
      height: mainWindowState.height,
      webPreferences: {
        contextIsolation: true,
        webSecurity: false,
        nodeIntegration: true,
        preload: path.join(__dirname, "preload.js"),
        icon: path.join(__dirname, "assets", "even_icon.png"),
      },
    })
    newWin.webContents.openDevTools()
    newWin.setMenuBarVisibility(false)
    const startUrl = url.format({
      pathname: path.join(__dirname, "./front-end-app/build/index.html"),
      protocol: "file",
    })
    newWin.loadURL(startUrl)
    return newWin
  })
  
  ipcMain.handle("kafkaConsumer", async () => {
    const newWin = new BrowserWindow({
      title: "consumer",
      x: mainWindowState.x,
      y: mainWindowState.y,
      width: mainWindowState.width,
      height: mainWindowState.height,
      webPreferences: {
        contextIsolation: true,
        webSecurity: false,
        nodeIntegration: true,
        preload: path.join(__dirname, "preload.js"),
        icon: path.join(__dirname, "assets", "even_icon.png"),
      },
    })
    newWin.webContents.openDevTools()
    newWin.setMenuBarVisibility(false)
    const startUrl = url.format({
      pathname: path.join(__dirname, "./front-end-app/build/index.html"),
      protocol: "file",
    })
    newWin.loadURL(startUrl)
    return newWin
  })
  return win
}

app.whenReady().then(() => {
  let win
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1920,
    defaultHeight: 1080,
  })
  win = createWindow(mainWindowState)
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      win = createWindow(mainWindowState)
    }
  })
  mainWindowState.manage(win)
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
