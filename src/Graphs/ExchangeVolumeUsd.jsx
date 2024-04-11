import "./Graphs.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

// Function to format large numbers
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


export default function ExchangeVolumeUsd() {
  const [exchangeData, setExchangeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/exchanges");
        // Assuming the API response contains the data field as shown in the example
        setExchangeData(response.data.data.slice(0, 5)); // Get the first 5 exchanges
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Container-VolumeUsd">
      <h2>VolumeUsd</h2>
      <AreaChart
        width={490}
        height={400}
        data={exchangeData} // Use the fetched exchange data here
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatVolume} /> {/* Format Y-axis ticks */}
        <Tooltip formatter={formatVolume} /> {/* Format tooltip */}
        <Area type="monotone" dataKey="volumeUsd" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
}
