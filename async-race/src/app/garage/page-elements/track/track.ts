import { div, objectTag } from '../../../shared/tags';
import { Car } from '../../../shared/interfaces';
import { states } from '../../../shared/states';
import { getRandomColor } from './track-parameters/random-color';
import { carNames } from './track-parameters/car-names';
import { getCoords } from './track-parameters/get-coordinates';
import { Controller } from '../controller';


export class Track {
  track: HTMLDivElement;

  carController: HTMLDivElement;

  startButton: HTMLDivElement;

  stopButton: HTMLDivElement;

  selectButton: HTMLDivElement;

  deleteButton: HTMLDivElement;

  carName: HTMLDivElement;

  car: Car;

  static selectedCar: Track;

  constructor(controller: Controller, carsWrapper?: HTMLElement, car?: Car) {
    this.track = div('track', carsWrapper);
    this.carController = div('car-controller', this.track);
    this.startButton = div('button', this.carController, 'Start');
    this.stopButton = div('button', this.carController, 'Stop');
    this.selectButton = div('button', this.carController, 'Select');
    this.deleteButton = div('button', this.carController, 'Delete');
    
    if (car) {
      this.car = car;
      this.car.carView = objectTag('svg', 'src/app/assets/car.svg', this.car.color, this.track);
    } else {
      const color = getRandomColor();
      this.car = {
        name: this.randomCarName(),
        color: color,
        carView: objectTag('svg', 'src/app/assets/car.svg', color, this.track),
      };
    }

    this.carName = div('car-name', this.carController, this.car.name);

    this.startButton.addEventListener('click', () => {
      this.start();
    });
    this.stopButton.addEventListener('click', () => {
      this.returnCar();
    });
    this.selectButton.addEventListener('click', () => {
      this.selectButton.classList.toggle('button-active');
      if (this.selectButton.classList.contains('button-active')) {
        controller.update.name.value = this.car.name;
        controller.update.color.value = this.car.color;
        Track.selectedCar = this;
      } else {
        controller.update.name.value = '';
        controller.update.color.value = '#000000';
      }
    });
    this.deleteButton.addEventListener('click', () => {
      if (this.car.id) {
        states.deleteCar(this.car.id);
        if (carsWrapper) {
          carsWrapper.removeChild(this.track);
        }
      }
    });
  }

  randomCarName() {
    const randomBrandIndex = Math.floor(Math.random() * carNames.brands.length);
    const randomBrand = carNames.brands[randomBrandIndex];
    const randomModelIndex = Math.floor(Math.random() * carNames.models.length);
    const randomModel = carNames.models[randomModelIndex];
    return `${randomBrand} ${randomModel}`;
  }

  start() {
    states.setEngineStatus(this.car.id, 'started').then((resolve) => {
      const { velocity, distance } = resolve;
      if (this.car.carView) {
        this.car.carView.style.transition = `${distance / velocity}ms linear`;
        this.car.carView.style.transform = `translateX(${this.track.clientWidth - this.car.carView.clientWidth}px)`;
      }
    })
    states.getResponseStatus(this.car.id).then((resolve) => {
      if (resolve === 500) {
        this.stop();
      }
    })
  }

  stop() {
    if (this.car.carView) {
      const carX = getCoords(this.car.carView).left;
      const trackX = getCoords(this.track).left;
      this.car.carView.style.transition = '0s';
      this.car.carView.style.transform = `translateX(${carX - trackX}px)`;
    }
  }

  returnCar() {
    if (this.car.carView) {
      this.car.carView.style.transition = '0s';
      this.car.carView.style.transform = 'translateX(0)';
    }
  }
}