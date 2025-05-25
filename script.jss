// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDrrCh9XcUeIP0D2zWYy9b2D_xZ7aNP9c",
  authDomain: "chat-room-6b83d.firebaseapp.com",
  projectId: "chat-room-6b83d",
  storageBucket: "chat-room-6b83d.firebasestorage.app",
  messagingSenderId: "582882374053",
  appId: "1:582882374053:web:c0b1f8ff67473078bc384c",
  measurementId: "G-HW19267QWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
