export interface ApiResponse<T> {
  timestamp: string;
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface RoomHistoricalValueDto {
  avgTemperature: number | null;
  rh: number | null;
  timestamp: string;
}
