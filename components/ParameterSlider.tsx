
import React from 'react';

interface ParameterSliderProps {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ParameterSlider: React.FC<ParameterSliderProps> = ({
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-slate-300 font-semibold">{label}</label>
        <span className="font-mono text-cyan-400 text-lg bg-slate-700/50 px-2 py-1 rounded">
          {value.toFixed(0)} <span className="text-slate-400 text-sm">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
      />
    </div>
  );
};
