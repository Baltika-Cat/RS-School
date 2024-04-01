import { table, tr, div, objectTag } from '../shared/tags';
import states from '../shared/states';
// import { WinnerRow } from '../shared/interfaces';

export default class Winners {
  winnersWrapper = div('winners-wrapper');

  winnersNumber = div('cars-number', this.winnersWrapper);

  table: HTMLTableElement;

  constructor() {
    this.table = table('table', this.winnersWrapper);
  }

  renderWinners(): HTMLDivElement {
    states.getWinners(1).then((resolve) => {
      this.winnersNumber.textContent = `Winners(${resolve.winners.length})`;
      console.log('winners', resolve)
      resolve.winners.map(async (item) => {
        states.getCar(item.id).then((carParams) => {
          const winner = {
            car: objectTag('svg', 'src/app/assets/car-winner.svg', carParams.color),
            name: carParams.name,
            wins: item.wins,
            time: item.time,
          };
          tr(winner, this.table);
        });
      });
      this.winnersWrapper.append(this.table);
    });

    return this.winnersWrapper;
  }
}
