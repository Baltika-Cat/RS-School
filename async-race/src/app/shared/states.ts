import { Car, CarParams, Winner } from './interfaces';

class States {
  baseUrl = 'http://127.0.0.1:3000';

  abortController = new AbortController();

  path = {
    garage: '/garage',
    winners: '/winners',
    engine: '/engine',
  };

  getCars = async (): Promise<Car[]> => {
    const response = await fetch(`${this.baseUrl}${this.path.garage}`);
    const cars: Car[] = await response.json();
    return cars;
  };

  getCar = async (id: number): Promise<Car> => {
    const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`);
    const car: Car = await response.json();
    return car;
  };

  createCar = async (body: Car): Promise<Car> => {
    const response = await fetch(`${this.baseUrl}${this.path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const car: Car = await response.json();

    return car;
  };

  updateCarParam = async (id: number, body: Car): Promise<Car> => {
    const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const car: Car = await response.json();

    return car;
  };

  deleteCar = async (id: number): Promise<Car> => {
    const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`, {
      method: 'DELETE',
    });
    const car: Car = await response.json();

    return car;
  };

  setEngineStatus = async (id: number | undefined, status: 'started' | 'stopped'): Promise<CarParams> => {
    const response = await fetch(`${this.baseUrl}${this.path.engine}/?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    const car: CarParams = await response.json();

    return car;
  };

  getResponseStatus = async (id: number | undefined, status = 'drive'): Promise<number> => {
    const response = await fetch(`${this.baseUrl}${this.path.engine}/?id=${id}&status=${status}`, {
      method: 'PATCH',
      signal: this.abortController.signal,
    });

    return response.status;
  };

  getWinners = async (): Promise<Winner[]> => {
    const response = await fetch(`${this.baseUrl}${this.path.winners}`);
    const winners: Winner[] = await response.json();

    return winners;
  };

  getWinner = async (id: number): Promise<Winner | undefined> => {
    const response = await fetch(`${this.baseUrl}${this.path.winners}/${id}`).catch(() => {
      return new Response();
    });
    console.log('');
    let winner: Winner | undefined;
    if (response.ok) {
      winner = await response.json();
    } else {
      winner = undefined;
    }

    return winner;
  };

  createWinner = async (body: Winner): Promise<Winner> => {
    const response = await fetch(`${this.baseUrl}${this.path.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const winner: Winner = await response.json();

    return winner;
  };

  updateWinner = async (id: number, body: Winner): Promise<Winner> => {
    const response = await fetch(`${this.baseUrl}${this.path.winners}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const winner: Winner = await response.json();

    return winner;
  };

  deleteWinner = async (id: number): Promise<Winner> => {
    const response = await fetch(`${this.baseUrl}${this.path.winners}/${id}`, {
      method: 'DELETE',
    });
    const winner: Winner = await response.json();

    return winner;
  };
}

export default new States();
