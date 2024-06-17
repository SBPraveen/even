const {contextBridge, ipcRenderer} = require('electron')
const os = require('os')

contextBridge.exposeInMainWorld('electron',{
    homedir : () => os.homedir(),
    osVersion: () => os.version(),
    arch: () => os.arch  
})
contextBridge.exposeInMainWorld('ipcRenderer',{
    send : (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args)=> func(...args)),
})