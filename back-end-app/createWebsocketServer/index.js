const { WebSocketServer } = require('ws')


let wsConnection

const startServer = (data, homeWindow) => {
    const wss = new WebSocketServer({ port: data.port });
    wss.on('connection', function connection(ws) {   
        wsConnection = ws
        ws.on('message', function message(msg) {
          console.log('received: %s', msg)
          homeWindow.webContents.send('wssReceivedMsg', msg)
        });
      });
}

const connectServer = (data, homeWindow) => {

}

const sendMessage = (data) => {
try {
    wsConnection.send(JSON.stringify(data.msg));
} catch (error) {
    console.log("Error while sending message - web socket server", error);
}
   

}
module.exports = {startServer, connectServer, sendMessage}