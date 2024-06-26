document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    if (!username) {
        window.location.href = 'index.html';
        return;
    }

    const socket = io();

    socket.emit('join', username);

    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messages = document.getElementById('messages');

    socket.on('message', (msg) => {
        const item = document.createElement('div');
        item.textContent = msg;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    });

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const msg = messageInput.value;
        socket.emit('chatMessage', msg);
        messageInput.value = '';
    });
});
