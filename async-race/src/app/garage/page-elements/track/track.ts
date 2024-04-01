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

  resetButton: HTMLDivElement;

  updateCarArea: HTMLDivElement;

  static selectedCar: Track;

  static activeSelectButton: HTMLDivElement;

  static winner: Car | undefined;

  static winnerTime: number;

  static winMessage = div('win-message', document.body);

  constructor(controller: Controller, carsWrapper?: HTMLElement, car?: Car) {
    this.track = div('track', carsWrapper);
    this.carController = div('car-controller', this.track);
    this.startButton = div('start-button', this.carController, 'Start');
    this.stopButton = div('stop-button', this.carController, 'Stop');
    this.stopButton.classList.add('disabled');
    this.selectButton = div('select-button', this.carController, 'Select');
    this.deleteButton = div('delete-button', this.carController, 'Delete');
    this.resetButton = controller.resetButton;
    this.updateCarArea = controller.updateCarArea;
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
        this.updateCarArea.classList.add('disabled');
      }
      this.selectButton.classList.toggle('button-active');
      this.updateCarArea.classList.toggle('disabled');
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
    Track.winner = this.car;
  }

  static randomCarName() {
    const randomBrandIndex = Math.floor(Math.random() * carNames.brands.length);
    const randomBrand = carNames.brands[randomBrandIndex];
    const randomModelIndex = Math.floor(Math.random() * carNames.models.length);
    const randomModel = carNames.models[randomModelIndex];
    return `${randomBrand} ${randomModel}`;
  }

  async start() {
    this.resetButton.classList.add('disabled');
    let time: number;
    await states.setEngineStatus(this.car.id, 'started').then((resolve) => {
      const { velocity, distance } = resolve;
      time = distance / velocity;
      if (this.car.carView) {
        this.car.carView.style.transition = `${time}ms linear`;
        this.car.carView.style.transform = `translateX(${this.track.clientWidth - this.car.carView.clientWidth}px)`;
      }
    });
    this.startButton.classList.add('disabled');
    this.stopButton.classList.remove('disabled');
    await states.getResponseStatus(this.car.id, 'drive').then((resolve) => {
      if (resolve === 500) {
        this.stop();
        this.startButton.classList.remove('disabled');
      }
      if (resolve === 200) {
        this.resetButton.classList.remove('disabled');
        if (!Track.winner) {
          this.showWinner(time, this.car);
        }
      }
    });
  }

  showWinner(timeInMs: number, car: Car) {
    const msPerSecond = 1000;
    const timeInSeconds = parseFloat((timeInMs / msPerSecond).toFixed(2));
    this.startButton.classList.remove('disabled');
    Track.winner = car;
    if (Track.winner.id) {
      states.getWinner(Track.winner.id).then((resolve) => {
        const id = Track.winner?.id;
        if (resolve) {
          const time = timeInSeconds < resolve.time ? timeInSeconds : resolve.time;
          const wins = resolve.wins + 1;
          if (id) {
            states.updateWinner(id, { id, wins, time });
          }
        } else {
          const time = timeInSeconds;
          const wins = 1;
          if (id) {
            states.createWinner({ id, wins, time });
          }
        }
      });
    }
    Track.winMessage.textContent = `${Track.winner.name} went first! (${timeInSeconds}s)`;
    Track.winMessage.classList.remove('invisible');
  }

  stop() {
    states.setEngineStatus(this.car.id, 'stopped');
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
