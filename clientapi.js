
const socket = io();

socket.on('message', (message) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p>${message}</p>`;
});

function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    socket.emit('message', message);
    messageInput.value = '';
}
