// server.js

const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  // Example: Listen for client messages
  socket.on('data', (data) => {
    const jsonData = JSON.parse(data.toString());
    console.log('Received message from client:', jsonData);

    // Log the received data on the server
    console.log(`Server received: Temperature ${jsonData.temperature}°C, Humidity ${jsonData.humidity}%`);

    // Send an acknowledgment back to the client
    socket.write(`Server received: Temperature ${jsonData.temperature}°C, Humidity ${jsonData.humidity}%`);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`TCP server listening on port ${PORT}`);
});
