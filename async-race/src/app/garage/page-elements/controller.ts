import { div, input } from '../../shared/tags';

export default class Controller {
  controllerWrapper = div('controller-wrapper');

  createCarArea = div('create-car-area', this.controllerWrapper);

  createCarInput = input('input', 'text', this.createCarArea);

  createCarColor = input('input-color', 'color', this.createCarArea);

  createCarButton = div('button', this.createCarArea, 'CREATE');

  updateCarArea = div('update-car-area', this.controllerWrapper);

  updateCarInput = input('input', 'text', this.updateCarArea);

  updateCarColor = input('input-color', 'color', this.updateCarArea);

  updateCarButton = div('button', this.updateCarArea, 'UPDATE');

  racingArea = div('racing-area', this.controllerWrapper);

  raceButton = div('button', this.racingArea, 'RACE');

  resetButton = div('button', this.racingArea, 'RESET');

  generateCarsButton = div('button', this.racingArea, 'GENERATE CARS');

  create = {
    name: this.createCarInput,
    color: this.createCarColor,
    button: this.createCarButton,
  };

  update = {
    name: this.updateCarInput,
    color: this.updateCarColor,
    button: this.updateCarButton,
  };

  constructor(garageWrapper: HTMLDivElement) {
    garageWrapper.append(this.controllerWrapper);
  }
}
