import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import "./Graphs.css";

// Import formatVolume function
const formatVolume = (value) => {
  if (value >= 1000) {
    return (value / 1000).toFixed(2) + "K";
  } else if (value >= 1) {
    return (value / 1).toFixed(2) + "$";
  } else if (value <= 1) {
    return (value / 1).toFixed(4) + "$";
  }
  return value;
};

export default function CoinMonitoring() {
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    const fetchData = async (asset) => {
      try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${asset}`);
        return response.data.data.priceUsd;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    const fetchCoinData = async () => {
      const bitcoinPrice = await fetchData("bitcoin");
      const ethereumPrice = await fetchData("ethereum");
      const chainlinkPrice = await fetchData("chainlink");
      const solanaPrice = await fetchData("solana");
      const nearProtocolPrice = await fetchData("near-protocol");

      // Check if any fetched price data is null
      if (
        bitcoinPrice !== null &&
        ethereumPrice !== null &&
        chainlinkPrice !== null &&
        solanaPrice !== null &&
        nearProtocolPrice !== null
      ) {
        const data = [
          { name: "Bitcoin", priceUsd: bitcoinPrice },
          { name: "Ethereum", priceUsd: ethereumPrice },
          { name: "Chainlink", priceUsd: chainlinkPrice },
          { name: "Solana", priceUsd: solanaPrice },
          { name: "Near Protocol", priceUsd: nearProtocolPrice }
        ];
        setCoinData(data);
        
        // Calculate the maximum price
        const maxPrice = Math.max(...data.map(coin => coin.priceUsd));
        setMaxPrice(maxPrice);
      } else {
        // Handle the case where fetching data fails
        console.error("Error: Some data couldn't be fetched");
      }

      setLoading(false); // Set loading to false after fetching data
    };

    fetchCoinData();
  }, []);

  return (
    <div className='Container-CoinM'>
      <h2>Coin Monitoring</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BarChart
          width={500}
          height={300}
          data={coinData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatVolume} domain={[0, maxPrice]} /> {/* Set Y-axis domain */}
          <Tooltip formatter={(value) => formatVolume(value)} />
          <Legend />
          <Bar dataKey="priceUsd" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
}
