import { div, mainTag, headerTag } from './shared/tags';
import { getGarage } from './garage/garage';

class App {
  buttonsArea: HTMLDivElement;
  
  toGarageButton: HTMLDivElement;

  toWinnersButton: HTMLDivElement;

  header: HTMLElement;

  main: HTMLElement;

  constructor() {
    this.header = headerTag('header');
    this.main = mainTag('main');
    this.buttonsArea = div('buttons-area', this.header);
    this.toGarageButton = div('app-button', this.buttonsArea, 'TO GARAGE');
    this.toWinnersButton = div('app-button', this.buttonsArea, 'TO WINNERS');
    this.toGarageButton.addEventListener('click', () => {
      this.toGarage();
    });
    this.toWinnersButton.addEventListener('click', () => {
      this.toWinners();
    });
  }

  clearPage() {
    let carsWrappers = [...document.querySelectorAll('.cars-wrapper')];
    carsWrappers.forEach(item => item.innerHTML = '');
    this.main.innerHTML = '';
  }

  toGarage() {
    this.clearPage();
    this.main.append(getGarage());
  }

  toWinners() {
    this.clearPage();
  }
}

const app = new App();
app.toGarage();