
export interface MotionDataPoint {
  time: number;
  position: number;
}

export interface MotionProfile {
  totalTime: number;
  data: MotionDataPoint[];
}

export interface MotionParams {
  distance: number;
  maxVelocity: number;
  acceleration: number;
  deceleration: number;
}
