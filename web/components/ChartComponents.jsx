// ChartComponent.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ chartData, chartOptions }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <Line data={chartData} options={chartOptions} />
  </div>
);

export default ChartComponent;
