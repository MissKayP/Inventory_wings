import React, { useContext, useEffect } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { Line } from 'react-chartjs-2';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Dashboard.css';
import product1 from '../assets/coke.png';
import product2 from '../assets/croissant.jpeg';
import product3 from '../assets/sanitary.jpeg';
import product4 from '../assets/lolli.jpg';
import product5 from '../assets/ballpen.jpeg';
import product6 from '../assets/croissant.jpeg';
import product7 from '../assets/kiwi.jpeg';
import product8 from '../assets/stimorol.jpeg';
import product9 from '../assets/yogi.jpeg';
import product10 from '../assets/tennis.jpeg';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { products } = useContext(InventoryContext);

  // Log the raw products array to debug unexpected data issues
  useEffect(() => {
    console.log("Raw products data in Dashboard:", products);
  }, [products]);

  // Filter out products with missing names or invalid quantities
  const validProducts = products.filter(product => product.name && product.quantity >= 0);

  // Prepare data for stock overview chart
  const stockData = {
    labels: validProducts.map((product) => product.name),
    datasets: [
      {
        label: 'Stock Level',
        data: validProducts.map((product) => product.quantity),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const stockOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'STOCK QUANTITY',
        },
      },
      x: {
        title: {
          display: true,
          text: 'PRODUCTS',
        },
      },
    },
    layout: {
      padding: 20,
    },
    elements: {
      line: {
        tension: 0.9,
        
      },
    },
  };

  const lowStockThreshold = 10;
  const lowStockProducts = validProducts.filter(product => product.quantity < lowStockThreshold);

  const imageUrls = [product1, product2, product3, product4,product5,product6,product7,product8,product9,product10];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stock-overview">
        <h2>Current Stock Levels</h2>
        <div className="chart-container">
          <Line data={stockData} options={stockOptions} />
        </div>
      </div>

      <div className="stock-carousel">
        <h2>Featured Products</h2>
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          showThumbs={false}
          showStatus={false}
          stopOnHover={true}
        >
          {imageUrls.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="low-stock-alert">
          <h2>Low Stock Alerts</h2>
          <ul>
            {lowStockProducts.map((product) => (
              <li key={product.id}>
                <strong>{product.name}</strong>: Only {product.quantity} left in stock!
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
