import { Car, CarParams, Winner, Garage, WinnersData } from './interfaces';

class States {
  baseUrl = 'http://127.0.0.1:3000';

  abortController = new AbortController();

  path = {
    garage: '/garage',
    winners: '/winners',
    engine: '/engine',
  };

  carsOnPage = '&_limit=7';

  winnersOnPage = '&_limit=10';

  getCars = async (page: number): Promise<Garage> => {
    const response = await fetch(`${this.baseUrl}${this.path.garage}/?_page=${page}${this.carsOnPage}`);
    const cars: Car[] = await response.json();
    const carsNumber: number = Number(response.headers.get('X-Total-Count'));

    return { cars, carsNumber };
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

  getWinners = async (page: number): Promise<WinnersData> => {
    const response = await fetch(`${this.baseUrl}${this.path.winners}/?_page=${page}${this.winnersOnPage}`);
    const winners: Winner[] = await response.json();
    const winnersNumber: number = Number(response.headers.get('X-Total-Count'));

    return { winners, winnersNumber };
  };

  getWinner = async (id: number): Promise<Winner | undefined> => {
    const response = await fetch(`${this.baseUrl}${this.path.winners}/${id}`).catch(() => {
      return new Response();
    });
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
