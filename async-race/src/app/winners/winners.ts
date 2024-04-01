import { table, tr, div, objectTag } from '../shared/tags';
import states from '../shared/states';
import winnersCar from './../assets/car-winner.svg';

export default class Winners {
  winnersOnPage = 10;

  pageNumber = 1;

  winnersWrapper = div('winners-wrapper');

  winnersNumber = 0;

  winnersNumberWrapper = div('cars-number', this.winnersWrapper);

  table = table('table', this.winnersWrapper);

  tableHead = this.table.firstChild;
 
  pageNavigation = div('page-navigation');

  prevButton = div('page-navigation-button', this.pageNavigation, 'PREV');

  nextButton = div('page-navigation-button', this.pageNavigation, 'NEXT');

  constructor() {
    this.prevButton.addEventListener('click', () => {
      this.table.innerHTML = '';
      if (this.tableHead instanceof Node) {
        this.table.append(this.tableHead);
      }
      this.prevPage();
    })

    this.nextButton.addEventListener('click', () => {
      this.table.innerHTML = '';
      if (this.tableHead instanceof Node) {
        this.table.append(this.tableHead);
      }
      this.nextPage();
    })
  }

  prevPage() {
    this.nextButton.classList.remove('disabled');
    this.pageNumber -= 1;
    if (this.pageNumber === 1) {
      this.prevButton.classList.add('disabled');
    }
    this.renderWinners();
  }

  nextPage() {
    this.prevButton.classList.remove('disabled');
    const lastPage = Math.ceil(this.winnersNumber / this.winnersOnPage);
    this.pageNumber += 1;
    if (this.pageNumber === lastPage) {
      this.nextButton.classList.add('disabled');
    }
    this.renderWinners();
  }

  renderWinners(): HTMLDivElement {
    if (this.pageNumber === 1) {
      this.prevButton.classList.add('disabled');
    }
    states.getWinners(this.pageNumber).then((resolve) => {
      this.winnersNumber = resolve.winnersNumber;
      this.winnersNumberWrapper.textContent = `Winners(${this.winnersNumber})`;
      resolve.winners.map((item) => {
        states.getCar(item.id).then((carParams) => {
          const winner = {
            car: objectTag('svg', winnersCar, carParams.color),
            name: carParams.name,
            wins: item.wins,
            time: item.time,
          };
          tr(winner, this.table);
        });
      });
      const lastPage = Math.ceil(this.winnersNumber / this.winnersOnPage);
      if (this.pageNumber === lastPage) {
        this.nextButton.classList.add('disabled');
      } else {
        this.nextButton.classList.remove('disabled');
      }
      this.winnersWrapper.append(this.table);
      this.table.append(this.pageNavigation);
    });

    return this.winnersWrapper;
  }
}
