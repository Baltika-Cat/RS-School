import { div, objectTag } from '../../../shared/tags';
import { Car } from '../../../shared/interfaces';
import states from '../../../shared/states';
import getRandomColor from './track-parameters/random-color';
import carNames from './track-parameters/car-names';
import getCoords from './track-parameters/get-coordinates';
import Controller from '../controller';

export default class Track {
  track: HTMLDivElement;

  car: Car;

  carController: HTMLDivElement;

  startButton: HTMLDivElement;

  stopButton: HTMLDivElement;

  selectButton: HTMLDivElement;

  deleteButton: HTMLDivElement;

  carName: HTMLDivElement;

  static selectedCar: Track;

  static activeSelectButton: HTMLDivElement;

  static winner: Car | undefined;

  static winMessage = div('win-message', document.body);

  constructor(controller: Controller, carsWrapper?: HTMLElement, car?: Car) {
    this.track = div('track', carsWrapper);
    this.carController = div('car-controller', this.track);
    this.startButton = div('start-button', this.carController, 'Start');
    this.stopButton = div('stop-button', this.carController, 'Stop');
    this.stopButton.classList.add('disabled');
    this.selectButton = div('select-button', this.carController, 'Select');
    this.deleteButton = div('delete-button', this.carController, 'Delete');
    Track.winMessage.classList.add('invisible');

    if (car) {
      this.car = car;
      this.car.carView = objectTag('svg', 'src/app/assets/car.svg', this.car.color, this.track);
    } else {
      const color = getRandomColor();
      this.car = {
        name: Track.randomCarName(),
        color,
        carView: objectTag('svg', 'src/app/assets/car.svg', color, this.track),
      };
    }

    if (this.car.id) {
      this.track.setAttribute('id', this.car.id.toString());
    }

    this.carName = div('car-name', this.carController, this.car.name);

    this.startButton.addEventListener('click', () => {
      this.start();
    });
    this.stopButton.addEventListener('click', () => {
      this.returnCar();
    });
    this.selectButton.addEventListener('click', (e) => {
      if (Track.activeSelectButton && Track.activeSelectButton !== e.target) {
        Track.activeSelectButton.classList.remove('button-active');
      }
      this.selectButton.classList.toggle('button-active');
      Track.activeSelectButton = this.selectButton;
      const controllerCopy = controller;
      if (this.selectButton.classList.contains('button-active')) {
        controllerCopy.update.name.value = this.car.name;
        controllerCopy.update.color.value = this.car.color;
        Track.selectedCar = this;
      } else {
        controllerCopy.update.name.value = '';
        controllerCopy.update.color.value = '#000000';
      }
    });
  }

  static randomCarName() {
    const randomBrandIndex = Math.floor(Math.random() * carNames.brands.length);
    const randomBrand = carNames.brands[randomBrandIndex];
    const randomModelIndex = Math.floor(Math.random() * carNames.models.length);
    const randomModel = carNames.models[randomModelIndex];
    return `${randomBrand} ${randomModel}`;
  }

  async start() {
    let time: number;
    const msPerSecond = 1000;
    await states.setEngineStatus(this.car.id, 'started').then((resolve) => {
      const { velocity, distance } = resolve;
      time = distance / velocity;
      if (this.car.carView) {
        this.car.carView.style.transition = `${time}ms linear`;
        this.car.carView.style.transform = `translateX(${this.track.clientWidth - this.car.carView.clientWidth}px)`;
      }
    });
    this.startButton.classList.add('disabled');
    const toWinnersButton = document.querySelectorAll('.app-button')[1];
    toWinnersButton.classList.add('disabled');
    this.stopButton.classList.remove('disabled');
    states.getResponseStatus(this.car.id, 'drive').then((resolve) => {
      if (resolve === 500) {
        console.log(this.car.name, 'stopped');
        this.stop();
        this.startButton.classList.remove('disabled');
      }
      if (resolve === 200) {
        this.startButton.classList.remove('disabled');
        if (!Track.winner) {
          Track.winner = this.car;
          Track.winMessage.textContent = `${Track.winner.name} went first! (${(time / msPerSecond).toFixed(2)}s)`;
          Track.winMessage.classList.remove('invisible');
        }
      }
    });
  }

  stop() {
    if (this.car.carView) {
      const carX = getCoords(this.car.carView);
      const trackX = getCoords(this.track);
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
