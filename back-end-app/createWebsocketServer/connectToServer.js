const { WebSocket } = require('ws')

const connectToServer = (url, cookies) => {
    let cookie = ``
    for (let item of cookies) {
        cookie += `${item.name}=${item.value};`
    }
    const wss = new WebSocket(url, { headers: { Cookie:cookie } })
    wss.onopen = (event) => console.log("connection Successful");
    wss.onerror = (error) => console.error(error)
    wss.onmessage = (data) => console.log('received: %s', data);
}
module.exports = connectToServer