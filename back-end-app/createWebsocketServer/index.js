const { WebSocketServer } = require('ws')


let wsConnection, wsMessageConnection

const startServer = (data, homeWindow) => {
  try {
    const wss = new WebSocketServer({ port: data.port });
    wsConnection = wss
    wss.on('connection', function connection(ws) {
      wsMessageConnection = ws
      ws.on('message', function message(msg) {
        console.log('received: %s', msg)
        homeWindow.webContents.send('wssReceivedMsg', msg)
      });
    });
  } catch (error) {
    console.log("Error while starting local web socket server")
  }

}

const connectServer = (serverData, homeWindow) => {
  try {
    let cookie = ``
    for (let item of serverData.cookies) {
      cookie += `${item.cookieName}=${item.cookieValue};`
    }
    wsConnection = new WebSocket(serverData.url, { headers: { Cookie: cookie } })
    wsConnection.onopen = (event) => {
      console.log("connection Successful");
    }
    wsConnection.onerror = (error) => console.error(error)
    wsConnection.onmessage = (data) => {
      console.log('received: %s', data);
      homeWindow.webContents.send('wssReceivedMsg', data)
    }
  } catch (error) {
    console.error("Error while connecting to websocket server: ", error)
  }
}

const sendMessage = (data) => {
  try {
    wsMessageConnection.send(JSON.stringify(data.msg));
  } catch (error) {
    console.log("Error while sending message - web socket server", error);
  }
}

const stopServer = () => {
  if(wsMessageConnection) wsMessageConnection.terminate()
  wsConnection.close()
}
module.exports = { startServer, connectServer, sendMessage, stopServer }