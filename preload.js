const { contextBridge, ipcRenderer } = require("electron");
const os = require("os");

contextBridge.exposeInMainWorld("electron", {
  homedir: () => os.homedir(),
  osVersion: () => os.version(),
  arch: () => os.arch,
});
contextBridge.exposeInMainWorld("ipcRenderer", {
  wssSendMsg: (msg) => ipcRenderer.send("wssSendMsg", msg),
  startWebSocketServer: (msg) => ipcRenderer.invoke("startWebSocketServer", msg),
  wssReceivedMsg: (callback) =>
    ipcRenderer.on("wssReceivedMsg", (_event, value) => callback(value)),
  receiveLogs: (callback) =>
    ipcRenderer.on("receiveLogs", (_event, value) => callback(value)),
  copyToClipBoard: (data) => ipcRenderer.send("copyToClipBoard", data),
  stopServer: () => ipcRenderer.send("stopServer"),
  fileSystemAccess: () => ipcRenderer.invoke("fileSystemAccess"),
  getTitle: () => ipcRenderer.invoke("getTitle"),
  kafkaSendMsg: (msg)=>ipcRenderer.send("kafkaSendMsg",msg),
});
