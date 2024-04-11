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

const CoinSupply = () => {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [ethereumData, setEthereumData] = useState(null);

  useEffect(() => {
    // Fetch data for Bitcoin
    axios
      .get("https://api.coincap.io/v2/assets/bitcoin")
      .then(response => {
        setBitcoinData(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching Bitcoin data:", error);
      });

    // Fetch data for Ethereum
    axios
      .get("https://api.coincap.io/v2/assets/ethereum")
      .then(response => {
        setEthereumData(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching Ethereum data:", error);
      });
  }, []);

  return (
    <div className="Container-CoinM">
      <h2>Coin Supply</h2>
      <BarChart
        width={350}
        height={300}
        data={[
          {
            name: "Bitcoin",
            uv: bitcoinData ? bitcoinData.supply : 0,
          },
          {
            name: "Ethereum",
            uv: ethereumData ? ethereumData.supply : 0,
          }
        ]}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default CoinSupply;
