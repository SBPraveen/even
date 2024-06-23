const { WebSocketServer } = require('ws')


let wsConnection

const startServer = (data, homeWindow) => {
  try {
    const wss = new WebSocketServer({ port: data.port });
    wss.on('connection', function connection(ws) {
      wsConnection = ws
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
    const wss = new WebSocket(serverData.url, { headers: { Cookie: cookie } })
    wss.onopen = (event) => console.log("connection Successful");
    wss.onerror = (error) => console.error(error)
    wss.onmessage = (data) => console.log('received: %s', data);
  } catch (error) {
    console.error("Error while connecting to websocket server: ", error)
  }
}

const sendMessage = (data) => {
  try {
    wsConnection.send(JSON.stringify(data.msg));
  } catch (error) {
    console.log("Error while sending message - web socket server", error);
  }


}
module.exports = { startServer, connectServer, sendMessage }