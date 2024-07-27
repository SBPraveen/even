const { contextBridge, ipcRenderer } = require('electron')
const operatingSys = require('os')

/**
 * Exposes OS-related functions to the renderer process.
 */
contextBridge.exposeInMainWorld('electron', {
    /**
     * Returns the architecture of the operating system.
     * @returns {string} The OS architecture.
     */
    arch: () => operatingSys.arch(),

    /**
     * Returns the home directory of the current user.
     * @returns {string} The home directory path.
     */
    homedir: () => operatingSys.homedir(),

    /**
     * Returns the operating system version.
     * @returns {string} The OS version.
     */
    osVersion: () => operatingSys.version(),
})

/**
 * Exposes IPC-related functions to the renderer process.
 */
contextBridge.exposeInMainWorld('ipcRenderer', {
    /**
     * Copies the provided data to the clipboard.
     * @param {string} data - The data to copy to the clipboard.
     */
    copyToClipBoard: (data) => ipcRenderer.send('copyToClipBoard', data),

    /**
     * Opens a file system access dialog.
     */
    fileSystemAccess: () => ipcRenderer.invoke('fileSystemAccess'),

    /**
     * Gets schema values from the main process.
     * @param {string} key - The key to get the schema values.
     * @returns {Promise<Object>} The schema values.
     */
    getSchemaValues: (key) => ipcRenderer.invoke('getSchemaValues', key),

    /**
     * Registers a schema with the main process.
     * @param {string} route - The route to the schema file.
     * @returns {Promise<string>} The registered schema key.
     */
    schemaRegister: (route) => ipcRenderer.invoke('schemaRegister', route),

    /**
     * Starts the WebSocket server.
     * @param {Object} msg - The data to start the server.
     */
    startWebSocketServer: (msg) =>
        ipcRenderer.send('startWebSocketServer', msg),

    /**
     * Stops the WebSocket server.
     */
    stopServer: () => ipcRenderer.send('stopServer'),

    /**
     * Listens for messages from the WebSocket server.
     * @param {Function} cbFunction - The callback function to handle received messages.
     */
    wssReceivedMsg: (cbFunction) =>
        ipcRenderer.on('wssReceivedMsg', (_event, recivedMessage) =>
            cbFunction(recivedMessage),
        ),

    /**
     * Sends a WebSocket message.
     * @param {string} msg - The message to send.
     */
    wssSendMsg: (msg) => ipcRenderer.send('wssSendMsg', msg),
})
