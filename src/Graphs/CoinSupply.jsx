import React, { useState, useEffect } from "react";
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

const CoinSupply = () => {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [ethereumData, setEthereumData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bitcoinResponse = await axios.get("https://api.coincap.io/v2/assets/bitcoin");
        const ethereumResponse = await axios.get("https://api.coincap.io/v2/assets/ethereum");
        setBitcoinData(bitcoinResponse.data.data);
        setEthereumData(ethereumResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Container-CoinM">
      <h2>Coin Supply</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BarChart
          width={350}
          height={300}
          data={[
            {
              name: "Bitcoin",
              Value: bitcoinData ? bitcoinData.supply : 0,
            },
            {
              name: "Ethereum",
              Value: ethereumData ? ethereumData.supply : 0,
            }
          ]}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatVolume}  />
          <Tooltip formatter={(value) => formatVolume(value)} />
          <Legend />
          <Bar dataKey="Value" fill="#82ca9d" />
        </BarChart>
      )}
    </div>
  );
};

export default CoinSupply;
