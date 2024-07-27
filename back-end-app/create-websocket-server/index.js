const { WebSocketServer } = require('ws')

let wsConnection, wsMessageConnection

/**
 * Starts a WebSocket server on the specified port.
 * @param {Object} data - The data object containing server configuration.
 * @param {number} data.port - The port number for the WebSocket server.
 * @param {Object} homeWindow - The Electron home window object.
 */
const startServer = (data, homeWindow) => {
    try {
        const wss = new WebSocketServer({ port: data.port })
        wsConnection = wss
        wss.on('connection', (webSocket) => {
            wsMessageConnection = webSocket
            webSocket.on('message', (msg) => {
                console.log('received: %s', msg)
                homeWindow.webContents.send('wssReceivedMsg', msg)
            })
        })
    } catch (error) {
        console.error(
            'Error while starting local web socket server:',
            error.message,
        )
    }
}

/**
 * Connects to a WebSocket server with provided cookies and URL.
 * @param {Object} serverData - The server data object containing connection details.
 * @param {string} serverData.url - The WebSocket server URL.
 * @param {Array} serverData.cookies - An array of cookie objects.
 * @param {Object} homeWindow - The Electron home window object.
 */
const connectServer = (serverData, homeWindow) => {
    try {
        let cookie = ''
        for (const item of serverData.cookies) {
            cookie += `${item.cookieName}=${item.cookieValue};`
        }
        wsConnection = new WebSocket(serverData.url, {
            headers: { Cookie: cookie },
        })
        /**
         *
         */
        wsConnection.onopen = () => {
            console.log('Connection successful')
        }
        /**
         *
         */
        wsConnection.onerror = (error) => {
            console.error('WebSocket error:', error.message)
        }
        /**
         *
         */
        wsConnection.onmessage = (data) => {
            console.log('received: %s', data)
            homeWindow.webContents.send('wssReceivedMsg', data)
        }
    } catch (error) {
        console.error(
            'Error while connecting to websocket server:',
            error.message,
        )
    }
}

/**
 * Sends a message through the WebSocket server.
 * @param {Object} data - The data object containing the message.
 * @param {string} data.msg - The message to be sent.
 */
const sendMessage = (data) => {
    try {
        if (
            wsMessageConnection &&
            wsMessageConnection.readyState === wsMessageConnection.OPEN
        ) {
            wsMessageConnection.send(JSON.stringify(data.msg))
        } else {
            console.error('WebSocket connection is not open.')
        }
    } catch (error) {
        console.error(
            'Error while sending message through web socket server:',
            error.message,
        )
    }
}

/**
 * Stops the WebSocket server and terminates the connection.
 */
const stopServer = () => {
    try {
        if (wsMessageConnection) {
            wsMessageConnection.terminate()
        }
        if (wsConnection) {
            wsConnection.close()
        }
    } catch (error) {
        console.error(
            'Error while stopping the WebSocket server:',
            error.message,
        )
    }
}

module.exports = { connectServer, sendMessage, startServer, stopServer }
