const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket Secure server is running.');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
    console.log('Client connected over WSS');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        socket.send(`Server received: ${message}`);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(8089, () => {
    console.log('WebSocket Secure server is running on port 8080');
});
