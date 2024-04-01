import { WinnerRow } from './interfaces';

export function div(className: string, parent?: HTMLElement, text?: string): HTMLDivElement {
  const divNew = document.createElement('div');
  divNew.classList.add(className);
  if (parent) {
    parent.append(divNew);
  }
  if (text) {
    divNew.textContent = text;
  }

  return divNew;
}

export function headerTag(className: string, parent = document.body): HTMLElement {
  const headerNew = document.createElement('header');
  headerNew.classList.add(className);
  parent.prepend(headerNew);

  return headerNew;
}

export function mainTag(className: string, parent = document.body): HTMLElement {
  const mainNew = document.createElement('main');
  mainNew.classList.add(className);
  parent.append(mainNew);

  return mainNew;
}

export function objectTag(className: string, data: string, color: string, parent?: HTMLDivElement): HTMLObjectElement {
  const objectNew = document.createElement('object');
  objectNew.classList.add(className);
  objectNew.type = 'image/svg+xml';
  objectNew.data = data;
  objectNew.onload = function changeColor() {
    objectNew.getSVGDocument()?.getElementById('car-svg')?.setAttribute('fill', color);
  };
  if (parent) {
    parent.append(objectNew);
  }

  return objectNew;
}

export function input(className: string, type: string, parent: HTMLDivElement): HTMLInputElement {
  const inputNew = document.createElement('input');
  inputNew.type = type;
  inputNew.classList.add(className);
  parent.append(inputNew);

  return inputNew;
}

function tableCell(tag: string, content: string | number | HTMLObjectElement, parent: HTMLTableRowElement) {
  const cell = document.createElement(tag);
  if (content instanceof HTMLObjectElement) {
    cell.append(content);
  } else {
    cell.textContent = content.toString();
  }
  parent.append(cell);
}

export function table(className: string, parent: HTMLDivElement): HTMLTableElement {
  const tableNew = document.createElement('table');
  tableNew.classList.add(className);
  const tableHead = document.createElement('thead');
  const row = document.createElement('tr');
  tableCell('th', 'Number', row);
  tableCell('th', 'Car', row);
  tableCell('th', 'Name', row);
  tableCell('th', 'Wins', row);
  tableCell('th', 'Best time', row);
  tableHead.append(row);
  tableNew.append(tableHead);
  parent.append(tableNew);

  return tableNew;
}

export function tr(winnersData: WinnerRow, parent: HTMLTableElement): HTMLTableRowElement {
  const row = document.createElement('tr');
  row.classList.add('winners-row');
  const number = parent.children.length - 1;
  tableCell('td', number, row);
  tableCell('td', winnersData.car, row);
  tableCell('td', winnersData.name, row);
  tableCell('td', winnersData.wins, row);
  tableCell('td', winnersData.time, row);
  parent.append(row);

  return row;
}
