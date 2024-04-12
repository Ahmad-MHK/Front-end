import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopAssetsList.css'; // Import CSS file for styling

const TopAssetsList = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
        const top100Assets = response.data.data.slice(0, 100);
        setAssets(top100Assets);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div className="top-assets-container">
      <h1>Top 100 Crypto Assets</h1>
      <ul className="asset-list">
        {assets.map(asset => (
          <li key={asset.id} className="asset-item">
            <span className="rank">Rank: {asset.rank}</span>
            <span className="name">Name: {asset.name}</span>
            <span className="price">Price (USD): {asset.priceUsd}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAssetsList;
