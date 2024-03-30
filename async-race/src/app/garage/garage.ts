import states from '../shared/states';
import { div } from '../shared/tags';
import Track from './page-elements/track/track';
import Controller from './page-elements/controller';

export default class Garage {
  static carsArray: Track[] = [];

  garageWrapper = div('garage-wrapper');

  carsWrapper = div('cars-wrapper');

  controller = new Controller(this.garageWrapper);

  carsNumber = div('cars-number', this.garageWrapper, `Garage(${Garage.carsArray.length})`);

  createCarButton = this.controller.create.button;

  updateCarButton = this.controller.update.button;

  constructor() {
    this.updateCarButton.addEventListener('click', () => {
      const color = this.controller.update.color.value;
      const { id } = Track.selectedCar.car;
      const name = this.controller.update.name.value;
      if (id) {
        states.updateCarParam(id, { name, color });
        Track.selectedCar.car.carView?.getSVGDocument()?.getElementById('car-svg')?.setAttribute('fill', color);
        Track.selectedCar.carName.textContent = name;
      }
    });

    this.createCarButton.addEventListener('click', () => {
      const color = this.controller.create.color.value;
      const name = this.controller.create.name.value;
      const carParams = {
        name,
        color,
      };
      const car = states.createCar(carParams);
      car.then((resolve) => {
        const newCar = new Track(this.controller, this.carsWrapper, resolve);
        Garage.carsArray.push(newCar);
        return newCar;
      });
      this.garageWrapper.append(this.carsWrapper);
    });

    this.controller.generateCarsButton.addEventListener('click', () => {
      this.renderCars();
    });

    this.controller.raceButton.addEventListener('click', () => {
      const carsOnPage = 7;
      const carsNumber = Garage.carsArray.length > carsOnPage ? carsOnPage : Garage.carsArray.length;
      for (let i = 0; i < carsNumber; i += 1) {
        Garage.carsArray[i].start();
      }
    });
  }

  renderCars() {
    for (let i = 1; i <= 7; i += 1) {
      const car = states.createCar(new Track(this.controller).car);
      car.then((resolve) => {
        const newCar = new Track(this.controller, this.carsWrapper, resolve);
        Garage.carsArray.push(newCar);
        return newCar;
      });
    }
    console.log(Garage.carsArray);
    this.garageWrapper.append(this.carsWrapper);
    this.carsNumber.textContent = `Garage(${Garage.carsArray.length})`;
  }

  getGarage(): HTMLDivElement {
    if (!this.carsWrapper.children.length) {
      states.getCars().then((resolve) => {
        resolve.map((item, index) => {
          const track = new Track(this.controller, this.carsWrapper, item);
          Garage.carsArray.push(track);
          if (index === resolve.length - 1) {
            this.carsNumber.textContent = `Garage(${Garage.carsArray.length})`;
          }
          return track;
        });
      });
      this.garageWrapper.append(this.carsWrapper);
    }

    return this.garageWrapper;
  }
}
