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

export default function ExchangeVolume() {
  const [exchangeData, setExchangeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/exchanges");
        // Sort exchanges by rank and filter the first five
        const sortedData = response.data.data
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 5);
        setExchangeData(sortedData);
      } catch (error) {
        console.error("Error fetching exchange data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Container-Volume">
      <h2>Exchange Volume Procent</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AreaChart
          width={490}
          height={400}
          data={exchangeData.map(exchange => ({
            name: exchange.name,
            Volume: parseFloat(exchange.percentTotalVolume) // Convert to float
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
          <YAxis tickFormatter={formatVolume} />
          <Tooltip formatter={(value) => formatVolume(value)} />
          <Area
            type="monotone"
            dataKey="Volume"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      )}
    </div>
  );
}
