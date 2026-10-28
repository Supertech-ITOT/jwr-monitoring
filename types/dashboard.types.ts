export interface HistoricalRoomMetricsParams {
  categoryId: number;
  roomId: number;
  fromDate: string;
  toDate: string;
  interval: number;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface RoomCurrentValueDto {
  roomId: number;
  roomName: string;
  avgTemp: number;
  rh: number;
  status: boolean;
  timestamp: string;
}

export interface RoomStatCard {
  id: number;
  categoryName: string;
  totalRoom: number;
  runningRoom: number;
}

export interface CommonRoomRequest {
  categoryId: number;
  roomIds: number[];
  interval: number;
  fromDate: string;
  toDate: string;
}

export interface CommonRoomLogResponse {
  timeStamp: string;
  avgTemp: number;
  rh: number;
}

export interface CommonRoomResponse {
  categoryId: number;
  roomId: number | string;
  roomName: string;
  logs: CommonRoomLogResponse[];
  avgTemperature?: number | null;
  minTemperature?: number | null;
  maxTemperature?: number | null;
  avgRh?: number | null;
  minRh?: number | null;
  maxRh?: number | null;
}

export interface EnergyRoomLogParams {
  categoryId: number;
  roomIds: number[];
  interval: number;
  fromDate: string;
  toDate: string;
  page?: number;
  size?: number;
  sort?: string;
}

export interface EnergyRoomLogResponse {
  timeStamp: string;
  energy: number;
  current: number;
  voltage: number;
  frequency: number;
}

export interface EnergyRoomResponse {
  roomId: number;
  roomName: string;
  categoryId: number;
  logs: EnergyRoomLogResponse[];
  avgEnergy: number;
  minEnergy: number;
  maxEnergy: number;
  avgCurrent: number;
  minCurrent: number;
  maxCurrent: number;
  avgVoltage: number;
  minVoltage: number;
  maxVoltage: number;
  avgFrequency: number;
  minFrequency: number;
  maxFrequency: number;
}
