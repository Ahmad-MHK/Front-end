import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Label,} from 'recharts';
import axios from 'axios';
import "./Graphs.css"

const RADIAN = Math.PI / 180;
const data = [
  { name: 'Fear', value: 25, color: '#0CCE6B' },
  { name: 'B', value: 50, color: '#DCED31' },
  { name: 'Gread', value: 25, color: '#EF2D56' },
];
const cx = 190;
const cy = 200;
const iR = 50;
const oR = 100;
const initialValue = 0;

const Example = () => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    axios.get('https://api.alternative.me/fng/')
      .then(response => {
        const fetchedValue = parseInt(response.data.data[0].value);
        setValue(fetchedValue);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
  };

  return (
    <div className='Container-Fear'>
      <h2 className='fear-text'>Fear And Gread</h2>
      <PieChart width={400} height={500} className='PieChart-Fear'>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <Label value={`Value: ${value}`} fill="#000" />
        </Pie>
        {needle(value, data, cx, cy, iR, oR, '#d0d000')}
        
      </PieChart>
    </div>
  );
};

export default Example;
