import states from '../shared/states';
import { div } from '../shared/tags';
import Track from './page-elements/track/track';
import Controller from './page-elements/controller';

export default class Garage {
  static carsArray: Track[] = [];

  garageWrapper = div('garage-wrapper');

  carsWrapper = div('cars-wrapper');

  // const buttonsArea = div('buttons-area', garageWrapper);

  // const renderButton = div('render-button', buttonsArea, 'Render');

  controller = new Controller(this.garageWrapper);

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
        name: name,
        color: color,
      }
      const car = states.createCar(carParams);
      car.then((resolve) => {
        const newCar = new Track(this.controller,this. carsWrapper, resolve);
        Garage.carsArray.push(newCar);
        return newCar;
      });
      this.garageWrapper.append(this.carsWrapper);
    });

    this.controller.generateCarsButton.addEventListener('click', () => {
      this.renderCars();
    });

    this.controller.raceButton.addEventListener('click', () => {
      let n = 0;
      if (Garage.carsArray.length > 7) {
        n = 7;
      } else {
        n = Garage.carsArray.length;
      }
      for (let i = 0; i < n; i += 1) {
        Garage.carsArray[i].start();
      }
    })
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
    console.log(Garage.carsArray)
    this.garageWrapper.append(this.carsWrapper);
  }

 getGarage(): HTMLDivElement {
    if (!this.carsWrapper.children.length) {
      states.getCars().then((resolve) => {
        resolve.map((item) => {
          const track = new Track(this.controller, this.carsWrapper, item);
          Garage.carsArray.push(track);
          return track;
        });
      });
      this.garageWrapper.append(this.carsWrapper);
    }

    return this.garageWrapper;
  }
}


/* const carsArray: Track[] = [];

const garageWrapper = div('garage-wrapper');

const carsWrapper = div('cars-wrapper');

// const buttonsArea = div('buttons-area', garageWrapper);

// const renderButton = div('render-button', buttonsArea, 'Render');

const controller = new Controller(garageWrapper);

const createCarButton = controller.create.button;

const updateCarButton = controller.update.button;

function renderCars() {
  for (let i = 1; i <= 7; i += 1) {
    const car = states.createCar(new Track(controller).car);
    car.then((resolve) => {
      const newCar = new Track(controller, carsWrapper, resolve);
      carsArray.push(newCar);
      return newCar;
    });
  }
  console.log(carsArray)
  garageWrapper.append(carsWrapper);
}

updateCarButton.addEventListener('click', () => {
  const color = controller.update.color.value;
  const { id } = Track.selectedCar.car;
  const name = controller.update.name.value;
  if (id) {
    states.updateCarParam(id, { name, color });
    Track.selectedCar.car.carView?.getSVGDocument()?.getElementById('car-svg')?.setAttribute('fill', color);
    Track.selectedCar.carName.textContent = name;
  }
});

createCarButton.addEventListener('click', () => {
  const color = controller.create.color.value;
  const name = controller.create.name.value;
  const carParams = {
    name: name,
    color: color,
  }
  const car = states.createCar(carParams);
  car.then((resolve) => {
    const newCar = new Track(controller, carsWrapper, resolve);
    carsArray.push(newCar);
    return newCar;
  });
  garageWrapper.append(carsWrapper);
})

controller.generateCarsButton.addEventListener('click', renderCars);

export function getGarage(): HTMLDivElement {
  if (!carsWrapper.children.length) {
    states.getCars().then((resolve) => {
      resolve.map((item) => {
        const track = new Track(controller, carsWrapper, item);
        carsArray.push(track);
        return track;
      });
    });
    garageWrapper.append(carsWrapper);
  }

  return garageWrapper;
} */