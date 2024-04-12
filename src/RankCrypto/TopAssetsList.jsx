import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopAssetsList.css'; 

const TopAssetsList = () => {
  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
        const top100Assets = response.data.data.slice(0, 50);
        setAssets(top100Assets);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  // Function to filter assets based on search query
  const filterAssets = () => {
    return assets.filter(asset =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Function to toggle favorite status of a coin
  const toggleFavorite = (assetId) => {
    if (favorites.includes(assetId)) {
      setFavorites(favorites.filter(id => id !== assetId));
    } else {
      setFavorites([...favorites, assetId]);
    }
  };

  // Function to format volume
  const formatVolume = (value) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(2) + "b";
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + "K";
    }
    return value;
  };

  return (
    <div className="top-assets-container">
      <h1>Top 50 Crypto Assets</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>
      <ul className="asset-list">
        {filterAssets().map(asset => (
          <li key={asset.id} className="asset-item">
            <span className="rank">Rank: {asset.rank}</span>
            <span className="name">Name: {asset.name}</span>
            <span className="price">Price (USD): {formatVolume(asset.priceUsd)}</span>
            <button onClick={() => toggleFavorite(asset.id)} className='Favoratie-button'>
              {favorites.includes(asset.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </li>
        ))}
      </ul>
      <div className="favorites">
        <h2>Favorites</h2>
        <ul>
          {assets.filter(asset => favorites.includes(asset.id)).map(favAsset => (
            <li key={favAsset.id}>{favAsset.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopAssetsList;
