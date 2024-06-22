const { WebSocket } = require('ws')

const connectToServer = (url, cookies) => {
    let Cookie = ``
    for (let item of cookies) {
        Cookie += `${item.name}=${item.value};`
    }
    console.log('cookies', Cookie)
    const wss = new WebSocket(url, { headers: { Cookie } })
    wss.onopen = (event) => console.log("connection Successful");
    wss.onerror = (error) => console.error(error)
    wss.onmessage = (data) => console.log('received: %s', data);
}
module.exports = connectToServer