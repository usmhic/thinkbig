// bigchainDBHandler.js
const driver = require('bigchaindb-driver');

// BigchainDB server instance or test network
const API_PATH = 'http://141.94.78.58:9984/api/v1/';

// Create a new keypair for the BigchainDB owner
const ownerKeypair = new driver.Ed25519Keypair();

// Create a BigchainDB connection
const conn = new driver.Connection(API_PATH);

// Function to handle sensor data received from the TCP server
const handleSensorData = (data) => {
    // Construct asset data with received sensor readings
    const assetData = {
        temperature: data.temperature.toFixed(2),
        humidity: data.humidity.toFixed(2),
    };

    // Construct metadata (you can customize this)
    const metadata = {
        timestamp: new Date().toISOString(),
        location: "Tangier"
    };

    // Create a transaction payload
    const transaction = driver.Transaction.makeCreateTransaction(
        assetData,
        metadata,
        [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(ownerKeypair.publicKey))],
        ownerKeypair.publicKey
    );

    // Sign the transaction with the owner's keypair
    const signedTransaction = driver.Transaction.signTransaction(transaction, ownerKeypair.privateKey);

    // Send the transaction to BigchainDB
    conn.postTransactionCommit(signedTransaction)
        .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted to BigchainDB.'))
        .catch(error => console.error('Error posting transaction to BigchainDB:', error));
};

// Export the handleSensorData function for use in other files
module.exports = {
    handleSensorData,
};
