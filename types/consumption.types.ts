export type RoomType = "POSITIVE" | "NEGATIVE";

export interface EnergyConsumptionRequest {
  roomIds: number[];
  roomType: RoomType;
  fromDate: string;
  toDate: string;
}

export interface RoomEnergy {
  roomId: number;
  roomName: string;
  componentA: number;
  componentB: number;
  componentC: number;
  totalEnergy: number;
}

export interface EnergyConsumptionResponse {
  rooms: RoomEnergy[];
  componentATotal: number;
  componentBTotal: number;
  componentCTotal: number;
  totalEnergy: number;
}
