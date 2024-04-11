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

export default function CoinMonitoring() {
  const [coinData, setCoinData] = useState([]);

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

      setCoinData([
        { name: "Bitcoin", priceUsd: bitcoinPrice },
        { name: "Ethereum", priceUsd: ethereumPrice },
        { name: "Chainlink", priceUsd: chainlinkPrice },
        { name: "Solana", priceUsd: solanaPrice },
        { name: "Near Protocol", priceUsd: nearProtocolPrice }
      ]);
    };

    fetchCoinData();
  }, []);

  return (
    <div className='Container-CoinM'>
      <h2>Coin Monitroring</h2>
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
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="priceUsd" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
