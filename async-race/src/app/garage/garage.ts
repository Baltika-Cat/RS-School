import states from '../shared/states';
import { div } from '../shared/tags';
import Track from './page-elements/track/track';
import Controller from './page-elements/controller';

export default class Garage {
  static carsArray: Track[] = [];

  static carsOnPage = 7;

  pageNumber = 1;

  garageWrapper = div('garage-wrapper');

  carsWrapper = div('cars-wrapper');

  controller = new Controller(this.garageWrapper);

  carsNumberWrapper = div('cars-number', this.garageWrapper);

  carsNumber = 0;

  createCarButton = this.controller.create.button;

  updateCarButton = this.controller.update.button;

  pageNavigation = div('page-navigation');

  prevButton = div('page-navigation-button', this.pageNavigation, 'PREV');

  nextButton = div('page-navigation-button', this.pageNavigation, 'NEXT');

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
        if (Garage.carsArray.length < Garage.carsOnPage) {
          const newCar = new Track(this.controller, this.carsWrapper, resolve);
          Garage.carsArray.push(newCar);
        }
        this.carsNumber += 1;
        this.carsNumberWrapper.textContent = `Garage(${this.carsNumber})`;
      });
    });

    this.controller.generateCarsButton.addEventListener('click', () => {
      this.renderCars();
    });

    this.controller.raceButton.addEventListener('click', () => {
      const toWinnersButton = document.querySelectorAll('.app-button')[1];
      toWinnersButton.classList.add('disabled');
      this.controller.raceButton.classList.add('disabled');
      Track.winner = undefined;
      Track.winnerTime = 0;
      const carsNumber = Garage.carsArray.length > Garage.carsOnPage ? Garage.carsOnPage : Garage.carsArray.length;
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
        states.abortController.abort('Stop race');
        car.returnCar();
        car.stopButton.classList.add('disabled');
        car.startButton.classList.remove('disabled');
      });
      states.abortController = new AbortController();
    });

    this.carsWrapper.addEventListener('click', (event) => {
      const { target } = event;
      if (target instanceof HTMLDivElement) {
        this.deleteCar(target);
      }
    });

    this.prevButton.addEventListener('click', () => {
      this.controller.raceButton.classList.remove('disabled');
      const toWinnersButton = document.querySelectorAll('.app-button')[1];
      toWinnersButton.classList.remove('disabled');
      this.carsWrapper.innerHTML = '';
      this.prevPage();
    });

    this.nextButton.addEventListener('click', () => {
      this.controller.raceButton.classList.remove('disabled');
      const toWinnersButton = document.querySelectorAll('.app-button')[1];
      toWinnersButton.classList.remove('disabled');
      this.carsWrapper.innerHTML = '';
      this.nextPage();
    });
  }

  deleteCar(target: HTMLDivElement) {
    if (target.classList.contains('delete-button')) {
      this.clickedDeleteButton = target;
      this.trackElement = <HTMLDivElement>target.closest('.track');
      if (this.carsWrapper && this.trackElement) {
        this.carID = Number(this.trackElement.getAttribute('id'));
        states.deleteWinner(this.carID);
        states.deleteCar(this.carID);
        this.carsWrapper.removeChild(this.trackElement);
        states.getCars(this.pageNumber).then((resolve) => {
          this.carsNumber = resolve.carsNumber;
          this.carsNumberWrapper.textContent = `Garage(${this.carsNumber})`;
        });
      }
    }
  }

  async renderCars() {
    const renderCarsNumber = 100;
    for (let i = 1; i <= renderCarsNumber; i += 1) {
      states.createCar(new Track(this.controller).car);
    }
    await states.getCars(this.pageNumber).then((resolve) => {
      this.carsWrapper.innerHTML = '';
      const { cars } = resolve;
      Garage.carsArray.length = 0;
      cars.forEach((car) => {
        const newCar = new Track(this.controller, this.carsWrapper, car);
        Garage.carsArray.push(newCar);
      });
      this.nextButton.classList.remove('disabled');
      this.garageWrapper.append(this.carsWrapper);
      this.carsNumber = resolve.carsNumber;
      this.carsNumberWrapper.textContent = `Garage(${this.carsNumber})`;
    });
  }

  prevPage() {
    this.nextButton.classList.remove('disabled');
    Garage.carsArray.length = 0;
    this.pageNumber -= 1;
    if (this.pageNumber === 1) {
      this.prevButton.classList.add('disabled');
    }
    states.getCars(this.pageNumber).then((resolve) => {
      resolve.cars.forEach((car) => {
        const newCar = new Track(this.controller, this.carsWrapper, car);
        Garage.carsArray.push(newCar);
      });
    });
  }

  nextPage() {
    this.prevButton.classList.remove('disabled');
    Garage.carsArray.length = 0;
    const lastPage = Math.ceil(this.carsNumber / Garage.carsOnPage);
    this.pageNumber += 1;
    if (this.pageNumber === lastPage) {
      this.nextButton.classList.add('disabled');
    }
    states.getCars(this.pageNumber).then((resolve) => {
      resolve.cars.forEach((car) => {
        const newCar = new Track(this.controller, this.carsWrapper, car);
        Garage.carsArray.push(newCar);
      });
    });
  }

  getGarage(): HTMLDivElement {
    if (!this.carsWrapper.children.length) {
      states.getCars(this.pageNumber).then((resolve) => {
        resolve.cars.map((item, index) => {
          const track = new Track(this.controller, this.carsWrapper, item);
          Garage.carsArray.push(track);
          if (index === resolve.cars.length - 1) {
            this.carsNumber = resolve.carsNumber;
            this.carsNumberWrapper.textContent = `Garage(${this.carsNumber})`;
            const lastPage = Math.ceil(this.carsNumber / Garage.carsOnPage);
            if (this.pageNumber === lastPage) {
              this.nextButton.classList.add('disabled');
            }
          }
          return track;
        });
      });

      if (this.pageNumber === 1) {
        this.prevButton.classList.add('disabled');
      }
      this.garageWrapper.append(this.carsWrapper);
      this.garageWrapper.append(this.pageNavigation);
    }

    return this.garageWrapper;
  }
}
