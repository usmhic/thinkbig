import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Picker } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('transactionId');

  useEffect(() => {
    const socket = new WebSocket('wss://141.94.78.58:9985/api/v1/streams/valid_transactions');

    socket.addEventListener('open', () => {
      console.log('CONNECTED');
      setIsStreaming(true);
    });

    socket.addEventListener('message', async (event) => {
      const transactionData = JSON.parse(event.data);

      const transactionId = transactionData.transaction_id;

      try {
        // You may need to adjust the following based on your actual API or storage mechanism in your Expo project
        // For simplicity, we're just simulating a fetch with a timeout
        const transactionDetails = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              metadata: {
                timestamp: new Date().toISOString(),
                location: 'Tangier',
              },
              asset: {
                data: {
                  temperature: transactionData.temperature.toFixed(2),
                  humidity: transactionData.humidity.toFixed(2),
                },
              },
            });
          }, 500);
        });

        setData((prevData) => [...prevData, { transactionData, transactionDetails }]);
        setShowIndicator(true);
        setHighlightedRow(prevData.length); // Index of the newly added row
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    });

    return () => {
      socket.close();
      setIsStreaming(false);
    };
  }, []); // Run the effect only once on mount

  useEffect(() => {
    // Clear the indicator and highlighted row after a delay
    const timeout = setTimeout(() => {
      setShowIndicator(false);
      setHighlightedRow(null);
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timeout);
  }, [showIndicator]);

  useEffect(() => {
    // Filter data based on search term and criteria
    const filtered = data.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      switch (searchCriteria) {
        case 'transactionId':
          return item.transactionData.transaction_id.toLowerCase().includes(searchTermLower);
        case 'location':
          return item.transactionDetails.metadata.location.toLowerCase().includes(searchTermLower);
        // Add more cases for other criteria as needed
        default:
          return false;
      }
    });
    setFilteredData(filtered);
  }, [searchTerm, searchCriteria, data]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { formattedDate, formattedTime };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Live Stream</Text>
        <View style={styles.statusContainer}>
          {isStreaming ? (
            <View style={styles.connectedContainer}>
              <FontAwesome name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.connectedText}>Connected</Text>
            </View>
          ) : (
            <Text style={styles.notConnectedText}>Not Connected</Text>
          )}
        </View>
      </View>
      {showIndicator && <Text style={styles.newDataIndicator}>New Data!</Text>}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Picker
          selectedValue={searchCriteria}
          style={styles.criteriaPicker}
          onValueChange={(itemValue) => setSearchCriteria(itemValue)}
        >
          <Picker.Item label="Transaction ID" value="transactionId" />
          <Picker.Item label="Location" value="location" />
          {/* Add more options for other criteria as needed */}
        </Picker>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <ScrollView>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.headerCell}>#</Text>
                <Text style={styles.headerCell}>Transaction ID</Text>
                <Text style={styles.headerCell}>Date</Text>
                <Text style={styles.headerCell}>Time</Text>
                <Text style={styles.headerCell}>Location</Text>
                <Text style={styles.headerCell}>Temperature (°C)</Text>
                <Text style={styles.headerCell}>Humidity (%)</Text>
              </View>
              {(searchTerm ? filteredData.reverse() : data.slice().reverse()).map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.row,
                    {
                      backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff',
                    },
                    index === highlightedRow ? styles.highlightedRow : null,
                  ]}
                >
                  <Text style={styles.cell}>{index + 1}</Text>
                  <Text style={styles.cell}>{item.transactionData.transaction_id}</Text>
                  <Text style={styles.cell}>
                    <FontAwesome name="clock-o" size={16} color="#333" />
                    {formatDate(item.transactionDetails.metadata.timestamp).formattedDate}
                  </Text>
                  <Text style={styles.cell}>
                    <FontAwesome name="clock-o" size={16} color="#333" />
                    {formatDate(item.transactionDetails.metadata.timestamp).formattedTime}
                  </Text>
                  <Text style={styles.cell}>
                    <FontAwesome name="map-marker" size={16} color="#333" />
                    {item.transactionDetails.metadata.location}
                  </Text>
                  <Text style={styles.cell}>
                    <FontAwesome name="fire" size={16} color="#e44d26" />
                    {item.transactionDetails.asset.data.temperature} °C
                  </Text>
                  <Text style={styles.cell}>
                    <FontAwesome name="cloud" size={16} color="#3498db" />
                    {item.transactionDetails.asset.data.humidity} %
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'linear-gradient(to right, #3498db, #8e44ad)',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#4CAF50',
  },
  connectedText: {
    color: '#4CAF50',
    marginLeft: 4,
  },
  notConnectedText: {
    color: '#ff5252',
  },
  newDataIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    color: '#4CAF50',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingLeft: 8,
    borderRadius: 4,
    color: '#333',
  },
  criteriaPicker: {
    height: 40,
    width: 120,
    color: '#333',
  },
  tableContainer: {
    flex: 1,
  },
  table: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 40,
  },
  headerCell: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  cell: {
    flex: 1,
    padding: 8,
    color: '#333',
  },
  highlightedRow: {
    backgroundColor: '#fff176',
  },
});

export default Table;
