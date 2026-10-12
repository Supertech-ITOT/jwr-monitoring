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
  avgTemp: number | null;
  rh: number | null;
  status: boolean | null;
  timestamp: string | null;
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
  avgTemp: number | null;
  rh: number | null;
}

export interface CommonRoomResponse {
  roomId: number;
  roomName: string;
  logs: CommonRoomLogResponse[];
  avgTemperature: number | null;
  minTemperature: number | null;
  maxTemperature: number | null;
  avgRh: number | null;
  minRh: number | null;
  maxRh: number | null;
}

export interface EnergyRoomLogParams {
  categoryId: number;
  roomIds: number[];
  interval: number;
  fromDate: string;
  toDate: string;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface EnergyRoomLogResponse {
  timeStamp: string;
  energy: number | null;
  current: number | null;
  voltage: number | null;
  frequency: number | null;
}

export interface EnergyRoomResponse {
  roomId: number;
  roomName: string;
  logs: EnergyRoomLogResponse[];
  avgEnergy: number | null;
  minEnergy: number | null;
  maxEnergy: number | null;
  avgCurrent: number | null;
  minCurrent: number | null;
  maxCurrent: number | null;
  avgVoltage: number | null;
  minVoltage: number | null;
  maxVoltage: number | null;
  avgFrequency: number | null;
  minFrequency: number | null;
  maxFrequency: number | null;
}
