// src/components/StockChart.js

import React, { useEffect, useRef } from 'react';
import { Chart, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required components and scales for Chart.js
Chart.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const StockChart = ({ data }) => {
  return (
    <div>
      <Bar 
        data={{
          labels: data.labels,  // array of product names
          datasets: [
            {
              label: 'Stock Levels',
              data: data.values,  // array of product quantities
              backgroundColor: '#f685a2',
            }
          ]
        }}
        options={{
          responsive: true,
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Products'
              }
            },
            y: {
              type: 'linear',
              title: {
                display: true,
                text: 'Stock Quantity'
              }
            }
          },
        }}
      />
    </div>
  );
};

export default StockChart;
