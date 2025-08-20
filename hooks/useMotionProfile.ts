import { useMemo } from 'react';
import { MotionParams, MotionProfile, MotionDataPoint } from '../types';

export const useMotionProfile = (params: MotionParams): MotionProfile => {
  return useMemo(() => {
    const { distance, maxVelocity, acceleration, deceleration } = params;

    if (distance <= 0 || maxVelocity <= 0 || acceleration <= 0 || deceleration <= 0) {
      return { totalTime: 0, data: [{ time: 0, position: 0, velocity: 0 }] };
    }

    const timeToAccelMax = maxVelocity / acceleration;
    const distToAccelMax = 0.5 * acceleration * timeToAccelMax * timeToAccelMax;

    const timeToDecelMax = maxVelocity / deceleration;
    const distToDecelMax = maxVelocity * timeToDecelMax - 0.5 * deceleration * timeToDecelMax * timeToDecelMax;

    let totalTime = 0;
    const data: MotionDataPoint[] = [];
    const timeStepCount = 200; 

    if (distToAccelMax + distToDecelMax >= distance) {
      // Triangular profile
      const peakVelocity = Math.sqrt(
        (2 * distance * acceleration * deceleration) / (acceleration + deceleration)
      );
      const timeToAccel = peakVelocity / acceleration;
      const timeToDecel = peakVelocity / deceleration;
      totalTime = timeToAccel + timeToDecel;
      const distAtAccelEnd = 0.5 * acceleration * timeToAccel * timeToAccel;

      if(totalTime === 0) return { totalTime: 0, data: [{ time: 0, position: 0, velocity: 0 }, {time: 0, position: distance, velocity: 0}] };

      const timeStep = totalTime / timeStepCount;
      for (let i = 0; i <= timeStepCount; i++) {
        const t = i * timeStep;
        if (t <= timeToAccel) {
          data.push({ time: t, position: 0.5 * acceleration * t * t, velocity: acceleration * t });
        } else {
          const tPrime = t - timeToAccel;
          const currentVelocity = Math.max(0, peakVelocity - deceleration * tPrime);
          data.push({ time: t, position: distAtAccelEnd + (peakVelocity * tPrime - 0.5 * deceleration * tPrime * tPrime), velocity: currentVelocity });
        }
      }
    } else {
      // Trapezoidal profile
      const distConstantVelocity = distance - distToAccelMax - distToDecelMax;
      const timeAtConstantVelocity = distConstantVelocity / maxVelocity;
      totalTime = timeToAccelMax + timeAtConstantVelocity + timeToDecelMax;

      if(totalTime === 0) return { totalTime: 0, data: [{ time: 0, position: 0, velocity: 0 }, {time: 0, position: distance, velocity: 0}] };

      const timeStep = totalTime / timeStepCount;
      for (let i = 0; i <= timeStepCount; i++) {
        const t = i * timeStep;
        if (t <= timeToAccelMax) {
          data.push({ time: t, position: 0.5 * acceleration * t * t, velocity: acceleration * t });
        } else if (t <= timeToAccelMax + timeAtConstantVelocity) {
          const tPrime = t - timeToAccelMax;
          data.push({ time: t, position: distToAccelMax + maxVelocity * tPrime, velocity: maxVelocity });
        } else {
          const tPrime = t - (timeToAccelMax + timeAtConstantVelocity);
          const currentVelocity = Math.max(0, maxVelocity - deceleration * tPrime);
          data.push({ time: t, position: distToAccelMax + distConstantVelocity + (maxVelocity * tPrime - 0.5 * deceleration * tPrime * tPrime), velocity: currentVelocity });
        }
      }
    }

    if (data.length > 0) {
      data[data.length - 1].position = distance;
      data[data.length - 1].velocity = 0;
    }

    return { totalTime, data };
  }, [params]);
};