const WebSocket = require('ws');
const http = require('http');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast the received message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

const server = http.createServer((req, res) => {
    // Handle HTTP requests if needed
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

const PORT = 8089; // Change this port to your desired port
server.listen(PORT, () => {
    console.log(`WebSocket Server is listening on port ${PORT}`);
});
