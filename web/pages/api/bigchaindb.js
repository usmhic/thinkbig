// pages/api/bigchaindb.js
import { Connection, Transaction } from 'bigchaindb-driver';

export default async (req, res) => {
  const API_PATH = 'http://141.94.78.58:9984/api/v1/';
  const { transactionId } = req.query;

  const conn = new Connection(API_PATH);

  try {
    const retrievedTransaction = await conn.getTransaction(transactionId);
    res.status(200).json(retrievedTransaction);
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
