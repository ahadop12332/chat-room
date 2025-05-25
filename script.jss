// Your Firebase configuration (replace with your own from Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
