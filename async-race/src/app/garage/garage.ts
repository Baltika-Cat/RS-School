import states from '../shared/states';
import { div } from '../shared/tags';
import Track from './page-elements/track/track';
import Controller from './page-elements/controller';

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
    car.then((resolve) => new Track(controller, carsWrapper, resolve));
  }
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

controller.generateCarsButton.addEventListener('click', renderCars);

export default function getGarage(): HTMLDivElement {
  if (!carsWrapper.children.length) {
    states.getCars().then((resolve) => {
      resolve.map((item) => {
        const track = new Track(controller, carsWrapper, item);
        return track;
      });
    });
    garageWrapper.append(carsWrapper);
  }

  return garageWrapper;
}
