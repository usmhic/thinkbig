// pages/index.js
import { useEffect, useState } from 'react';
import { AiOutlineClockCircle, AiOutlineEnvironment, AiOutlineFire, AiOutlineCloud } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('transactionId');

  useEffect(() => {
    const socket = new WebSocket('ws://141.94.78.58:9985/api/v1/streams/valid_transactions');

    socket.addEventListener('open', () => {
      console.log('CONNECTED');
      setIsStreaming(true);
    });

    socket.addEventListener('message', async (event) => {
      const transactionData = JSON.parse(event.data);

      const transactionId = transactionData.transaction_id;

      try {
        const transactionDetails = await fetch(`/api/bigchaindb?transactionId=${transactionId}`);
        const transactionDetailsJson = await transactionDetails.json();
        setData((prevData) => [...prevData, { transactionData, transactionDetails: transactionDetailsJson }]);
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
    <div className="p-4 sm:p-8 bg-gradient-to-r from-blue-500 to-purple-500 h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-white">Live Stream</h1>
        <div className="flex items-center text-1xl sm:text-3xl ">
          {isStreaming ? (
            <div className="flex items-center text-green-400">
              <FiCheckCircle className="mr-2" />
              <span>Connected</span>
            </div>
          ) : (
            <div className="text-red-500">Not Connected</div>
          )}
        </div>
      </div>
      {showIndicator && <div className="absolute top-4 right-4 text-green-400">New Data!</div>}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 text-black rounded-md mr-2 focus:outline-none focus:border-blue-500"
        />
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-blue-500"
        >
          <option value="transactionId">Transaction ID</option>
          <option value="location">Location</option>
          {/* Add more options for other criteria as needed */}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border shadow-lg rounded-md text-black overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-2 sm:p-3">#</th>
              <th className="border p-2 sm:p-3">Transaction ID</th>
              <th className="border p-2 sm:p-3">Date</th>
              <th className="border p-2 sm:p-3">Time</th>
              <th className="border p-2 sm:p-3">Location</th>
              <th className="border p-2 sm:p-3">Temperature (°C)</th>
              <th className="border p-2 sm:p-3">Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {(searchTerm ? filteredData.reverse() : data.slice().reverse()).map((item, index) => (
              <tr
                key={index}
                className={`transition-all duration-1000 ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } ${index === highlightedRow ? 'bg-yellow-200' : ''}`}
              >
                <td className="border p-2 sm:p-3">{index + 1}</td>
                <td className="border p-2 sm:p-3">{item.transactionData.transaction_id}</td>
                <td className="border p-2 sm:p-3">
                  <AiOutlineClockCircle className="inline-block mr-1 sm:mr-2" />
                  {formatDate(item.transactionDetails.metadata.timestamp).formattedDate}
                </td>
                <td className="border p-2 sm:p-3">
                  <AiOutlineClockCircle className="inline-block mr-1 sm:mr-2" />
                  {formatDate(item.transactionDetails.metadata.timestamp).formattedTime}
                </td>
                <td className="border p-2 sm:p-3">
                  <AiOutlineEnvironment className="inline-block mr-1 sm:mr-2" />
                  {item.transactionDetails.metadata.location}
                </td>
                <td className="border p-2 sm:p-3">
                  <AiOutlineFire className="inline-block mr-1 sm:mr-2" />
                  {item.transactionDetails.asset.data.temperature} °C
                </td>
                <td className="border p-2 sm:p-3">
                  <AiOutlineCloud className="inline-block mr-1 sm:mr-2" />
                  {item.transactionDetails.asset.data.humidity} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
