import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MotionDataPoint } from '../types';

interface MotionProfileChartProps {
  data: MotionDataPoint[];
}

export const MotionProfileChart: React.FC<MotionProfileChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <defs>
          <filter id="glowPosition" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowVelocity" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis
          dataKey="time"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(tick) => tick.toFixed(2)}
          stroke="#94a3b8"
          label={{ value: 'Time (s)', position: 'insideBottom', offset: -15, fill: '#cbd5e1' }}
          tick={{ fill: '#94a3b8' }}
        />
        <YAxis
          yAxisId="left"
          stroke="#94a3b8"
          domain={['dataMin', 'dataMax']}
          label={{ value: 'Position (mm)', angle: -90, position: 'center', fill: '#cbd5e1', dx: -10 }}
          tick={{ fill: '#94a3b8' }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#f472b6"
          domain={[0, 'dataMax']}
          label={{ value: 'Velocity (mm/s)', angle: -90, position: 'center', fill: '#cbd5e1', dx: 35 }}
          tick={{ fill: '#f472b6' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            borderColor: '#38bdf8',
            color: '#e2e8f0',
          }}
          labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
          formatter={(value: number, name: string) => {
            const unit = name === 'position' ? 'mm' : 'mm/s';
            return [`${value.toFixed(2)} ${unit}`, name.charAt(0).toUpperCase() + name.slice(1)];
          }}
          labelFormatter={(label) => `Time: ${label.toFixed(2)}s`}
        />
        <Legend wrapperStyle={{ color: '#e2e8f0', bottom: 0 }} />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="position"
          stroke="#22d3ee"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6, fill: '#06b6d4', stroke: '#67e8f9', strokeWidth: 2 }}
          style={{ filter: 'url(#glowPosition)' }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="velocity"
          stroke="#f472b6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5, fill: '#db2777', stroke: '#f9a8d4', strokeWidth: 2 }}
          style={{ filter: 'url(#glowVelocity)' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
