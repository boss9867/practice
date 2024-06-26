document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('joinForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        if (username) {
            window.location.href = `chatroom.html?username=${encodeURIComponent(username)}`;
        }
    });
});
