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

export function objectTag(className: string, data: string, color: string, parent: HTMLDivElement): HTMLObjectElement {
  const objectNew = document.createElement('object');
  objectNew.classList.add(className);
  objectNew.type = 'image/svg+xml';
  objectNew.data = data;
  objectNew.onload = function changeColor() {
    objectNew.getSVGDocument()?.getElementById('car-svg')?.setAttribute('fill', color); // что-нибудь придумать со знаком вопроса(или не придумывать)
  };
  parent.append(objectNew);

  return objectNew;
}

export function input(className: string, type: string, parent: HTMLDivElement): HTMLInputElement {
  const inputNew = document.createElement('input');
  inputNew.type = type;
  inputNew.classList.add(className);
  parent.append(inputNew);

  return inputNew;
}
