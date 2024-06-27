const { contextBridge, ipcRenderer } = require('electron')
const os = require('os')

contextBridge.exposeInMainWorld('electron', {
    homedir: () => os.homedir(),
    osVersion: () => os.version(),
    arch: () => os.arch
})
contextBridge.exposeInMainWorld('ipcRenderer', {
    wssSendMsg: (msg) => ipcRenderer.send('wssSendMsg', msg),
    startWebSocketServer: (msg) => ipcRenderer.send('startWebSocketServer', msg),
    wssReceivedMsg: (callback) => ipcRenderer.on('wssReceivedMsg', (_event, value) => callback(value)),
    copyToClipBoard: (data) => ipcRenderer.send('copyToClipBoard', data),
    stopServer: () => ipcRenderer.send('stopServer'),
})