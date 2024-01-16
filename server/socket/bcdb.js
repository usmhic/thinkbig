const net = require('net');
const BigchainDB = require('bigchaindb-driver');

// BigchainDB configuration (replace with your server details)
const API_PATH = 'http://141.94.78.58:9984/api/v1/';
const connection = new BigchainDB.Connection(API_PATH);

// Generate a key pair for the user (replace this with your own key pair)
const userKeypair = new BigchainDB.Ed25519Keypair();

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    try {
      const jsonData = JSON.parse(data.toString());
      const temperature = jsonData.temperature;
      const humidity = jsonData.humidity;

      console.log(`Received data - Temperature: ${temperature}°C, Humidity: ${humidity}%`);

      // Create an asset representing temperature and humidity data
      const assetData = {
        'temperature': temperature,
        'humidity': humidity,
      };

      // Optionally, you can provide metadata
      const metadata = { 'source': 'sensor' };

      // Create a BigchainDB create transaction
      const createTx = BigchainDB.Transaction.makeCreateTransaction(
        assetData,
        metadata,
        [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction.makeEd25519Condition(userKeypair.publicKey))],
        userKeypair.publicKey
      );

      // Sign the transaction with the private key
      const signedTx = BigchainDB.Transaction.signTransaction(createTx, userKeypair.privateKey);

      // Send the transaction to BigchainDB
      connection.postTransactionCommit(signedTx)
        .then((response) => {
          if (response.ok) {
            console.log("Transaction submitted to BigchainDB");
          } else {
            console.error(`Error submitting transaction to BigchainDB. Response: ${JSON.stringify(response)}`);
          }
        })
        .catch((error) => {
          console.error(`Error submitting transaction to BigchainDB: ${error}`);
        });

    } catch (error) {
      console.error(`Error parsing JSON data: ${error}`);
    }
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (err) => {
    console.error(`Socket error: ${err.message}`);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
