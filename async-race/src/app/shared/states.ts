import { Car, CarParams } from './interfaces';

class States {
  baseUrl = 'http://127.0.0.1:3000';

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
  }

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

  deleteCar = async (id: number): Promise<JSON> => {
    const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`, {
      method: 'DELETE',
    });
    const car: JSON = await response.json();

    return car;
  };

  setEngineStatus = async (id: number | undefined, status: 'started' | 'stopped'): Promise<CarParams> => {
    const response = await fetch(`${this.baseUrl}${this.path.engine}/?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    const car: Promise<CarParams> = await response.json();

    return car;
  };

  getResponseStatus = async (id: number | undefined, status = 'drive'): Promise<number> => {
    const response = await fetch(`${this.baseUrl}${this.path.engine}/?id=${id}&status=${status}`, {
      method: 'PATCH',
    });

    return response.status;
  };
}

export default new States();
