const { WebSocket } = require('ws')

const connectToServer = (serverData) => {
    try {
        let cookie = ``
        for (let item of serverData.cookies) {
            cookie += `${item.cookieName}=${item.cookieValue};`
        }
        const wss = new WebSocket(serverData.url, { headers: { Cookie: cookie } })
        wss.onopen = (event) => console.log("connection Successful");
        wss.onerror = (error) => console.error(error)
        wss.onmessage = (data) => console.log('received: %s', data);
    }catch(error){
        console.error("Error while connecting to websocket server: ",error)
    }
}
module.exports = connectToServer