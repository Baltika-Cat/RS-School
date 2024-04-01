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

export interface Garage {
  cars: Car[];
  carsNumber: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerRow {
  car: HTMLObjectElement;
  name: string;
  wins: number;
  time: number;
}

export interface WinnersData {
  winners: Winner[];
  winnersNumber: number;
}