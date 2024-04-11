import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function ExchangeVolume() {
  const [exchangeData, setExchangeData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coincap.io/v2/exchanges")
      .then(response => {
        // Sort exchanges by rank and filter the first five
        const sortedData = response.data.data
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 5);
        setExchangeData(sortedData);
      })
      .catch(error => {
        console.error("Error fetching exchange data:", error);
      });
  }, []);

  return (
    <div className="Container-Volume">
      <h2>Exchange Volume Procent</h2>
      <AreaChart
        width={490}
        height={400}
        data={exchangeData.map(exchange => ({
          name: exchange.name,
          uv: parseFloat(exchange.percentTotalVolume) // Convert to float
        }))}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </div>
  );
}
