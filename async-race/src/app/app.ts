import { div, mainTag, headerTag } from './shared/tags';
import Garage from './garage/garage';
import Winners from './winners/winners';

class App {
  garage = new Garage();

  winners = new Winners();

  header = headerTag('header');

  main = mainTag('main');

  buttonsArea = div('buttons-area', this.header);

  toGarageButton = div('app-button', this.buttonsArea, 'TO GARAGE');

  toWinnersButton = div('app-button', this.buttonsArea, 'TO WINNERS');

  constructor() {
    this.toGarageButton.classList.add('disabled');
    this.toGarageButton.addEventListener('click', () => {
      this.toGarage();
      this.toGarageButton.classList.add('disabled');
      this.toWinnersButton.classList.remove('disabled');
    });
    this.toWinnersButton.addEventListener('click', () => {
      this.toWinners();
      this.toGarageButton.classList.remove('disabled');
      this.toWinnersButton.classList.add('disabled');
    });
  }

  clearPage() {
    const carsWrappers = [...document.querySelectorAll('.cars-wrapper')];
    carsWrappers.forEach((item) => {
      const itemCopy = item;
      itemCopy.innerHTML = '';
      return item;
    });
    const winnersTableRows = [...document.querySelectorAll('.winners-row')];
    winnersTableRows.forEach((row) => {
      row.remove();
      return row;
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
    this.main.append(this.winners.renderWinners());
  }
}

const app = new App();
app.toGarage();
