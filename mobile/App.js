import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { WebSocket } from 'react-native-websocket';
import { FiCheckCircle } from 'react-icons/fi';

const App = () => {
  const [data, setData] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://141.94.78.58:9985/api/v1/streams/valid_transactions');

    socket.onopen = () => {
      console.log('CONNECTED');
      setIsStreaming(true);
    };

    socket.onmessage = async (event) => {
      const transactionData = JSON.parse(event.data);

      try {
        const transactionDetails = await fetch(`/api/bigchaindb?transactionId=${transactionData.transaction_id}`);
        const transactionDetailsJson = await transactionDetails.json();
        setData((prevData) => [...prevData, { transactionData, transactionDetails: transactionDetailsJson }]);
        setShowIndicator(true);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    };

    return () => {
      socket.close();
      setIsStreaming(false);
    };
  }, []); // Run the effect only once on mount

  useEffect(() => {
    // Clear the indicator after a delay
    const timeout = setTimeout(() => {
      setShowIndicator(false);
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timeout);
  }, [showIndicator]);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'blue' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Live Stream</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isStreaming ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', color: 'green' }}>
              <FiCheckCircle style={{ marginRight: 8 }} />
              <Text style={{ color: 'green' }}>Connected</Text>
            </View>
          ) : (
            <Text style={{ color: 'red' }}>Not Connected</Text>
          )}
        </View>
      </View>
      {showIndicator && <Text style={{ color: 'green' }}>New Data!</Text>}
      <ScrollView style={{ backgroundColor: 'black', borderRadius: 8, flex: 1 }}>
        {data.map((item, index) => (
          <View key={index} style={{ marginVertical: 8 }}>
            <Text style={{ color: 'white' }}>{`Transaction ID: ${item.transactionData.transaction_id}, Location: ${item.transactionDetails.metadata.location}, Temperature: ${item.transactionDetails.asset.data.temperature} °C, Humidity: ${item.transactionDetails.asset.data.humidity} %`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default App;
