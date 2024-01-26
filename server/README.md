# ThinkBig Server

## Overview

ThinkBig Server consists of two main components: the TCP server (`netServer.js`) and the BigchainDB handler (`bigchainDBHandler.js`). The TCP server is responsible for receiving sensor data from clients, while the BigchainDB handler processes the received data and posts transactions to the BigchainDB blockchain.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## TCP Server (`netServer.js`)

### Start the TCP Server

Run the following command to start the TCP server:

```bash
node netServer.js
```

The server will listen on port 3000 by default. Adjust the port as needed.

### Receive Sensor Data

Clients can connect to the server and send sensor data. The server logs received data and passes it to the BigchainDB handler.

## BigchainDB Handler (`bigchainDBHandler.js`)

### Configure BigchainDB Connection

Open `bigchainDBHandler.js` and update the `API_PATH` variable with the correct BigchainDB server details.

### Handle Sensor Data

The `handleSensorData` function processes sensor data, creates transactions, signs them, and posts them to BigchainDB.

## Technologies Used

- Node.js
- TCP server for real-time data communication
- BigchainDB for storing and retrieving data on the blockchain
