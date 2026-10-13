export interface ApiResponse<T> {
  timestamp: string;
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface PageMetadata {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PageResponse<T> {
  content: T[];
  page: PageMetadata;
}

export interface RoomHistoricalValueDto {
  avgTemperature: number | null;
  rh: number | null;
  timestamp: string;
}
