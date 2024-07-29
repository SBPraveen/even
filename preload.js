const { contextBridge, ipcRenderer } = require('electron')
const os = require('os')

contextBridge.exposeInMainWorld('electron', {
    homedir: () => os.homedir(),
    osVersion: () => os.version(),
    arch: () => os.arch,
})
contextBridge.exposeInMainWorld('ipcRenderer', {
    wssSendMsg: (msg) => ipcRenderer.send('wssSendMsg', msg),
    startWebSocketServer: (msg) =>
        ipcRenderer.invoke('startWebSocketServer', msg),
    connectWebSocketServer: (data) =>
        ipcRenderer.send('connectWebSocketServer', data),
    wssReceivedMsg: (callback) =>
        ipcRenderer.on('wssReceivedMsg', (_event, value, connection) =>
            callback(value, connection)
        ),
    receiveLogs: (callback) =>
        ipcRenderer.on('receiveLogs', (_event, value) => callback(value)),
    copyToClipBoard: (data) => ipcRenderer.send('copyToClipBoard', data),
    stopServer: () => ipcRenderer.send('stopServer'),
    fileSystemAccess: (data) => ipcRenderer.invoke('fileSystemAccess', data),
    importNewSchema: (path) => ipcRenderer.invoke('importNewSchema', path),
    getTitle: () => ipcRenderer.invoke('getTitle'),
    kafkaSendMsg: (msg) => ipcRenderer.send('kafkaSendMsg', msg),
    getSchemaValues: (key) => ipcRenderer.invoke('getSchemaValues', key),
    schemaRegister: (route) => ipcRenderer.invoke('schemaRegister', route),
    getAllDocuments: () => ipcRenderer.invoke('getAllDocuments'),
    kafkaConsumerStarter: () => ipcRenderer.send('kafkaConsumerStarter'),
    kafkaReceiveMsg: (callback) =>
        ipcRenderer.on('kafkaReceiveMsg', (_event, value) => callback(value)),
})
