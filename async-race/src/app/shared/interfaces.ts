export interface Car {
  name: string;
  color: string;
  id?: number;
  status?: 'started' | 'stopped' | 'drive';
  carView?: HTMLObjectElement;
}

export interface CarParams {
  velocity: number;
  distance: number;
}
