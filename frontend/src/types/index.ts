export interface Scooter {
  id: string;
  model: string;
  batteryLevel: number;
  status: string;
  latitude: number;
  longitude: number;
  enabled: boolean;
}

export interface Ride {
  id: string;
  scooterId: string;
  status: string;
  startedAt?: string;
  endedAt?: string;
}
