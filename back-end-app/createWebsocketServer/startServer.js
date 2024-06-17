const { WebSocketServer } = require('ws')


const startServer = (data) => {
    const wss = new WebSocketServer({ port: data.port });

    wss.on('connection', function connection(ws) {
      ws.on('error', console.error);
    
      ws.on('message', function message(data) {
        console.log('received: %s', data);
      });
    
      ws.send('something');
    });
}

module.exports = startServer