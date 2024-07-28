const { WebSocketServer, WebSocket } = require('ws')
const { stopProject, runProject } = require('./proxy-server')

let wsMessageConnection, process;
const connections = new Map();
let connectionId = 0;

const startServer = (data, homeWindow) => {
    try {
        const wss = new WebSocketServer({ port: data.port })
        if (data.proxyPort) {
            process = runProject(
                data.proxyCommand,
                data.proxyFolderPath,
                homeWindow
            )
        }

        wss.on('connection', function connection(ws) {
            console.log('websocket Creation successful')
            connectionId += 1
            const connectionKey = `connection${connectionId}`
            const connectionDetails = { frontendWs: ws }
            wsMessageConnection = ws

            if (data.proxyPort) {
                let backendWs
                while (
                    !backendWs ||
                    backendWs.readyState !== WebSocket.CONNECTING
                ) {
                    backendWs = new WebSocket(
                        `ws://localhost:${data.proxyPort}`,
                        { headers: { origin: data.proxyOrigin } }
                    )
                    setTimeout(() => {
                        stopServer()
                        return false
                    }, 60 * 1000 * 10)
                }
                connectionDetails.backendWs = backendWs

                ws.on('message', function message(msg) {
                    if (backendWs.readyState === WebSocket.OPEN) {
                        backendWs.send(msg)
                    }
                    homeWindow.webContents.send('wssReceivedMsg', msg)
                })

                backendWs.on('open', () => {
                    console.log('Backend connection established')
                })

                backendWs.on('message', (backendMsg) => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(backendMsg.toString())
                    }
                    homeWindow.webContents.send(
                        'wssReceivedMsg',
                        backendMsg,
                        'server'
                    )
                })

                backendWs.on('close', () => {
                    console.log('Backend connection closed')
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.close()
                    }
                })

                backendWs.on('error', (error) => {
                    console.error('Backend connection error: ', error)
                })
            }
            ws.on('message', function message(msg) {
                homeWindow.webContents.send('wssReceivedMsg', msg, 'browser')
            })

            ws.on('close', () => {
                console.log('Connection closed')
                if (
                    data.proxyPort &&
                    connectionDetails.backendWs &&
                    connectionDetails.backendWs.readyState === WebSocket.OPEN
                ) {
                    connectionDetails.backendWs.close()
                }
                connections.delete(connectionKey)
            })

            ws.on('error', (error) => {
                console.error('Connection error: ', error)
                return false
            })
            connections.set(connectionKey, connectionDetails)
        })
        return true
    } catch (error) {
        console.log('Error while starting local web socket server', error)
        return false
    }
}

const connectServer = (serverData, homeWindow) => {
    try {
        let cookie = ``
        for (let item of serverData.cookies) {
            cookie += `${item.cookieName}=${item.cookieValue};`
        }
        const ws = new WebSocket(serverData.url, {
            headers: { Cookie: cookie, origin: serverData.origin },
        })
        wsMessageConnection = ws
        ws.onopen = (event) => {
            console.log('Connection successful')
        }
        ws.onerror = (error) => {
            console.error('WebSocket error occurred: ', error)
        }
        ws.on('message', function message(data) {
            homeWindow.webContents.send('wssReceivedMsg', data, 'server')
        })
        ws.onclose = (event) => {
            console.log('Connection closed')
            stopServer()
        }
    } catch (error) {
        console.error('Error while connecting to websocket server: ', error)
    }
}

const sendMessage = (data) => {
    try {
        if (
            wsMessageConnection &&
            wsMessageConnection.readyState === WebSocket.OPEN
        ) {
            wsMessageConnection.send(typeof data === 'object' ? data.msg : data)
        }
    } catch (error) {
        console.log('Error while sending message - web socket server', error)
    }
}

const stopServer = () => {
    for (const [key, connection] of connections) {
        if (connection.frontendWs.readyState === WebSocket.OPEN) {
            connection.frontendWs.terminate()
        }
        if (connection.backendWs.readyState === WebSocket.OPEN) {
            connection.backendWs.close()
        }
    }
    connections.clear()
    if (
        wsMessageConnection &&
        wsMessageConnection.readyState === WebSocket.OPEN
    ) {
        wsMessageConnection.close()
    }
    stopProject(process)
}

module.exports = { startServer, connectServer, sendMessage, stopServer };
