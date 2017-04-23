const  ws = require('nodejs-websocket');
console.log('Server Init');
var server = ws.createServer();
server.listen(8001);

server.on('connection', function (conn) {
    console.log("New connection");

    conn.on('error', function (err) {
        if (err.code !== 'ECONNRESET') {
            throw err
        }
    })

    conn.on("close", function (code, reason) {
        console.log("Connection closed.");
    })
});

module.exports = {
    broadcastMessage(msg) {
        server.connections.forEach(function (conn) {
            conn.sendText(JSON.stringify(msg));
        })
    }
};
