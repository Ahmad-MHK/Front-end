import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
} from 'recharts';

const Graph = () => {
    const [bitcoinData, setBitcoinData] = useState([]);
    const [ethereumData, setEthereumData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bitcoinResponse = await axios.get('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&limit=12');
                const ethereumResponse = await axios.get('https://api.coincap.io/v2/assets/ethereum/history?interval=d1&limit=12');
                
                setBitcoinData(bitcoinResponse.data.data.map(item => ({
                    name: new Date(item.time).toLocaleDateString(),
                    value: parseFloat(item.priceUsd).toFixed(2)
                })));

                setEthereumData(ethereumResponse.data.data.map(item => ({
                    name: new Date(item.time).toLocaleDateString(),
                    value: parseFloat(item.priceUsd).toFixed(2)
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='Container-Graph'>
            <h2>Social Media User</h2>
            <AreaChart
                width={500}
                height={200}
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
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" name="Bitcoin" data={bitcoinData} />
                <Area type="monotone" dataKey="value" stroke="#DCED31" fill="#EF2D56" name="Ethereum" data={ethereumData} />
            </AreaChart>
        </div>
    );
};

export default Graph;
