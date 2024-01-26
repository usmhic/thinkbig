// netServer.js
const net = require('net');
const bigchainDBHandler = require('./bigchainDBHandler');

const server = net.createServer((socket) => {
    console.log('A client has connected.');

    // Receive data from clients
    socket.on('data', (data) => {
        const sensorData = JSON.parse(data.toString());

        console.log('Received sensor data from client:', sensorData);

        // Pass the data to the bigchainDBHandler
        bigchainDBHandler.handleSensorData(sensorData);
    });

    socket.on('end', () => {
        console.log('A client has disconnected.');
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`TCP server is listening on port ${port}`);
});
