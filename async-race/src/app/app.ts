import { div, mainTag, headerTag } from './shared/tags';
import Garage from './garage/garage';

class App {
  garage = new Garage();

  header = headerTag('header');

  main = mainTag('main');

  buttonsArea = div('buttons-area', this.header);

  toGarageButton = div('app-button', this.buttonsArea, 'TO GARAGE');

  toWinnersButton = div('app-button', this.buttonsArea, 'TO WINNERS');

  constructor() {
    this.toGarageButton.addEventListener('click', () => {
      this.toGarage();
    });
    this.toWinnersButton.addEventListener('click', () => {
      this.toWinners();
    });
  }

  clearPage() {
    const carsWrappers = [...document.querySelectorAll('.cars-wrapper')];
    carsWrappers.forEach((item) => {
      const itemCopy = item;
      itemCopy.innerHTML = '';
      return item;
    });
    this.main.innerHTML = '';
    Garage.carsArray.length = 0;
  }

  toGarage() {
    this.clearPage();
    this.main.append(this.garage.getGarage());
  }

  toWinners() {
    this.clearPage();
  }
}

const app = new App();
app.toGarage();
