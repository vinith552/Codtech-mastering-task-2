// Real-Time Chat Application

// 1. Set up a Node.js server using Express and WebSocket.
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files (frontend)
app.use(express.static('public'));

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 2. Create a Vue.js frontend for the chat application
// In the `public` folder, create an `index.html` file with Vue.js:

/* public/index.html */
<!--
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Application</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
</head>
<body>
  <div id="app">
    <div class="chat-window">
      <div v-for="message in messages" :key="message.id" class="message">
        {{ message.text }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
  </div>

  <script>
    const app = Vue.createApp({
      data() {
        return {
          ws: null,
          messages: [],
          newMessage: ''
        };
      },
      methods: {
        sendMessage() {
          if (this.newMessage.trim() !== '') {
            this.ws.send(this.newMessage);
            this.newMessage = '';
          }
        }
      },
      mounted() {
        this.ws = new WebSocket(`ws://${location.host}`);
        this.ws.onmessage = (event) => {
          this.messages.push({ id: Date.now(), text: event.data });
        };
      }
    });

    app.mount('#app');
  </script>

  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0; }
    .chat-window { width: 300px; height: 400px; border: 1px solid #ccc; overflow-y: auto; margin-bottom: 10px; padding: 10px; background: #fff; }
    .message { margin-bottom: 5px; padding: 5px; border-radius: 5px; background: #e0e0e0; }
    input { width: 300px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
  </style>
</body>
</html>
-->
