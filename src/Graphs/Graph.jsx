import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    AreaChart,
    Area,
    ResponsiveContainer,
  } from 'recharts';

const Graph = () => {

    const data = [
        {name: "Jan", value: 400, value2: 500},
        {name: "Feb", value: 500, value2: 60},
        {name: "Mar", value: 450, value2: 600},
        {name: "Apr", value: 800, value2: 2000},
        {name: "may", value: 1000, value2: 1000},
        {name: "Jun", value: 200, value2: 2100},
        {name: "Jul", value: 2000, value2: 1000},
        {name: "Aug", value: 2100, value2: 2000},
        {name: "Sep", value: 2500, value2: 5000},
        {name: "Okt", value: 1000, value2: 6000},
        {name: "Nov", value: 800, value2: 600},
        {name: "Dec", value: 500, value2: 900},

    ]

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
              <p className="text-medium text-lg">{label}</p>
              <p className="text-sm text-blue-400">
                Product 1:
                <span className="ml-2">${payload[0].value}</span>
              </p>
              <p className="text-sm text-indigo-400">
                Product 2:
                <span className="ml-2">${payload[1].value}</span>
              </p>
            </div>
          );
        }
      };

    return (
        <div>
            <h2>Socail Media User</h2>
            <AreaChart
                width={500}
                height={200}
                data={data}
                syncId="anyId"
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
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Brush />
                <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="value2" stroke="#DCED31" fill="#EF2D56" />
            </AreaChart>
        </div>
    );
};


export default Graph;