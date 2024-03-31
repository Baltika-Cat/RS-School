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

  clickedDeleteButton: HTMLDivElement | undefined;

  carID: number;

  trackElement: HTMLDivElement | undefined;

  constructor() {
    this.carID = 0;
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
      this.controller.raceButton.classList.add('disabled');
      Track.winner = undefined;
      Track.winnerTime = 0;
      const carsOnPage = 7;
      const carsNumber = Garage.carsArray.length > carsOnPage ? carsOnPage : Garage.carsArray.length;
      for (let i = 0; i < carsNumber; i += 1) {
        Garage.carsArray[i].start();
      }
    });

    this.controller.resetButton.addEventListener('click', () => {
      const toWinnersButton = document.querySelectorAll('.app-button')[1];
      toWinnersButton.classList.remove('disabled');
      this.controller.raceButton.classList.remove('disabled');
      Track.winMessage.classList.add('invisible');
      Garage.carsArray.forEach((car) => {
        car.returnCar();
        car.stopButton.classList.add('disabled');
        car.startButton.classList.remove('disabled');
      });
    });

    this.carsWrapper.addEventListener('click', (event) => {
      const { target } = event;
      if (target instanceof HTMLDivElement) {
        this.deleteCar(target);
      }
    });
  }

  async deleteCar(target: HTMLDivElement) {
    if (target.classList.contains('delete-button')) {
      this.clickedDeleteButton = target;
      this.trackElement = <HTMLDivElement>target.closest('.track');
      if (this.carsWrapper && this.trackElement) {
        this.carID = Number(this.trackElement.getAttribute('id'));
        const deletedCar = Garage.carsArray.filter((item) => item.car.id === this.carID)[0];
        const deletedCarIndex = Garage.carsArray.indexOf(deletedCar);
        Garage.carsArray.splice(deletedCarIndex, 1);
        this.carsNumber.textContent = `Garage(${Garage.carsArray.length})`;
        states.deleteCar(this.carID);
        this.carsWrapper.removeChild(this.trackElement);
      }
    }
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
      states.getCars().then((resolve) => console.log(resolve));
    }

    return this.garageWrapper;
  }
}
