// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
  apiKey: "AIzaSyA8TgjEQAE89ffz62cWh4jfsYWZ3Bz9-0Q",
  authDomain: "linkup-4b485.firebaseapp.com",
  projectId: "linkup-4b485",
  storageBucket: "linkup-4b485.firebasestorage.app",
  messagingSenderId: "463846261877",
  appId: "1:463846261877:web:80c7539868e6ab63eae43c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const messagesRef = database.ref("messages");

let username = "";

// Set username and show chat
function setUsername() {
    username = document.getElementById("username").value.trim();
    if (username) {
        document.getElementById("username-section").style.display = "none";
        document.getElementById("chat-section").style.display = "block";
        loadMessages();
    } else {
        alert("Please enter a username!");
    }
}

// Send message to Firebase
function sendMessage() {
    const messageInput = document.getElementById("message");
    const messageText = messageInput.value.trim();
    if (messageText && username) {
        const timestamp = new Date().toISOString();
        messagesRef.push({
            username: username,
            text: messageText,
            timestamp: timestamp
        });
        messageInput.value = "";
    }
}

// Load and display messages in real-time
function loadMessages() {
    messagesRef.on("child_added", (snapshot) => {
        const message = snapshot.val();
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `
            <span class="username">${message.username}</span>: 
            <span class="text">${message.text}</span>
            <div class="timestamp">${new Date(message.timestamp).toLocaleTimeString()}</div>
        `;
        const messagesDiv = document.getElementById("messages");
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

// Allow sending messages with Enter key
document.getElementById("message").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});
