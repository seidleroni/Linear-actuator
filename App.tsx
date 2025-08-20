
import React, { useState } from 'react';
import { ParameterSlider } from './components/ParameterSlider';
import { MotionProfileChart } from './components/MotionProfileChart';
import { ResultDisplay } from './components/ResultDisplay';
import { useMotionProfile } from './hooks/useMotionProfile';
import { 
  DISTANCE_PARAMS, 
  VELOCITY_PARAMS, 
  ACCELERATION_PARAMS, 
  DECELERATION_PARAMS 
} from './constants';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [distance, setDistance] = useState(DISTANCE_PARAMS.default);
  const [maxVelocity, setMaxVelocity] = useState(VELOCITY_PARAMS.default);
  const [acceleration, setAcceleration] = useState(ACCELERATION_PARAMS.default);
  const [deceleration, setDeceleration] = useState(DECELERATION_PARAMS.default);

  const { totalTime, data } = useMotionProfile({
    distance,
    maxVelocity,
    acceleration,
    deceleration,
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Linear Actuator Motion Calculator
            </h1>
            <p className="mt-2 text-lg text-slate-400">
              Visualize trapezoidal and triangular motion profiles in real-time.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls Column */}
            <div className="lg:col-span-1 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-2xl shadow-cyan-500/10">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-3">Parameters</h2>
              <div className="space-y-6">
                <ParameterSlider
                  label="Total Distance"
                  unit="mm"
                  min={DISTANCE_PARAMS.min}
                  max={DISTANCE_PARAMS.max}
                  step={DISTANCE_PARAMS.step}
                  value={distance}
                  onChange={(e) => setDistance(parseFloat(e.target.value))}
                />
                <ParameterSlider
                  label="Max Velocity"
                  unit="mm/s"
                  min={VELOCITY_PARAMS.min}
                  max={VELOCITY_PARAMS.max}
                  step={VELOCITY_PARAMS.step}
                  value={maxVelocity}
                  onChange={(e) => setMaxVelocity(parseFloat(e.target.value))}
                />
                <ParameterSlider
                  label="Acceleration"
                  unit="mm/s²"
                  min={ACCELERATION_PARAMS.min}
                  max={ACCELERATION_PARAMS.max}
                  step={ACCELERATION_PARAMS.step}
                  value={acceleration}
                  onChange={(e) => setAcceleration(parseFloat(e.target.value))}
                />
                <ParameterSlider
                  label="Deceleration"
                  unit="mm/s²"
                  min={DECELERATION_PARAMS.min}
                  max={DECELERATION_PARAMS.max}
                  step={DECELERATION_PARAMS.step}
                  value={deceleration}
                  onChange={(e) => setDeceleration(parseFloat(e.target.value))}
                />
              </div>
            </div>

            {/* Chart and Results Column */}
            <div className="lg:col-span-2 space-y-8">
              <ResultDisplay time={totalTime} />
              <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-700 shadow-2xl shadow-cyan-500/10 h-96">
                <MotionProfileChart data={data} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
