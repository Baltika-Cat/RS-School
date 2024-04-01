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

  carsNumber = div('cars-number', this.garageWrapper);

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

    /* states.getCars(1).then((resolve) => {
      this.carsNumber.textContent = `Garage(${resolve.carsNumber})`;
    }) */

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
        if (Garage.carsArray.length === Garage.carsOnPage) {
          Garage.carsArray.length = 0;
          Garage.carsArray.push(newCar);
        } else {
          Garage.carsArray.push(newCar);
        }
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
      const carsNumber = Garage.carsArray.length > Garage.carsOnPage
          ? Garage.carsOnPage
          : Garage.carsArray.length;
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
  }

  deleteCar(target: HTMLDivElement) {
    if (target.classList.contains('delete-button')) {
      this.clickedDeleteButton = target;
      this.trackElement = <HTMLDivElement>target.closest('.track');
      if (this.carsWrapper && this.trackElement) {
        this.carID = Number(this.trackElement.getAttribute('id'));
        // const deletedCar = Garage.carsArray.filter((item) => item.car.id === this.carID)[0];
        // const deletedCarIndex = Garage.carsArray.indexOf(deletedCar);
        // Garage.carsArray.splice(deletedCarIndex, 1);
        states.deleteWinner(this.carID);
        states.deleteCar(this.carID);
        this.carsWrapper.removeChild(this.trackElement);
        states.getCars(1).then((resolve) => {
          this.carsNumber.textContent = `Garage(${resolve.carsNumber})`;
        })
      }
    }
  }

  async renderCars() {
    const renderCarsNumber = 100;
    for (let i = 1; i <= renderCarsNumber; i += 1) {
      states.createCar(new Track(this.controller).car);
      /*await car.then((resolve) => {
        const newCar = new Track(this.controller, this.carsWrapper, resolve);
        Garage.carsArray.push(newCar);
        return newCar;
      });*/
      //if (i === renderCarsNumber)
    }
    await states.getCars(1).then((resolve) => {
      this.carsWrapper.innerHTML = '';
      const { cars } = resolve;
      Garage.carsArray.length = 0;
      cars.forEach((car) => {
        const newCar = new Track(this.controller, this.carsWrapper, car);
        Garage.carsArray.push(newCar)
      });
      this.garageWrapper.append(this.carsWrapper);
      this.carsNumber.textContent = `Garage(${resolve.carsNumber})`;
    })
    // console.log(Garage.carsArray);
  }

  getGarage(): HTMLDivElement {
    if (!this.carsWrapper.children.length) {
      states.getCars(1).then((resolve) => {
        resolve.cars.map((item, index) => {
          const track = new Track(this.controller, this.carsWrapper, item);
          Garage.carsArray.push(track);
          if (index === resolve.cars.length - 1) {
            this.carsNumber.textContent = `Garage(${resolve.carsNumber})`;
          }
          return track;
        });
      });
      this.garageWrapper.append(this.carsWrapper);
      this.garageWrapper.append(this.pageNavigation);
    }

    return this.garageWrapper;
  }
}
