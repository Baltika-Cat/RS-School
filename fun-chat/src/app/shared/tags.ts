import { InputOptions } from './interfaces';

export function div(className: string, parent?: HTMLElement): HTMLDivElement {
  const divNew = document.createElement('div');
  divNew.classList.add(className);
  if (parent) {
    parent.append(divNew);
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

export function form(className: string, parent: HTMLDivElement, name: string) {
  const formNew = document.createElement('form');
  formNew.name = name;
  formNew.classList.add(className);
  parent.append(formNew);

  return formNew;
}

export function input({ className, type, parent, placeholder, id, labelText }: InputOptions): HTMLInputElement {
  if (labelText) {
    const label = document.createElement('label');
    label.htmlFor = id || '';
    label.textContent = labelText;
    parent.append(label);
  }
  const inputNew = document.createElement('input');
  inputNew.type = type;
  inputNew.placeholder = placeholder;
  inputNew.id = id || '';
  inputNew.classList.add(className);
  parent.append(inputNew);

  return inputNew;
}

export function buttonTag(className: string, parent: HTMLElement, text: string): HTMLButtonElement {
  const buttonNew = document.createElement('button');
  buttonNew.type = parent instanceof HTMLDivElement ? 'button' : 'submit';
  buttonNew.classList.add(className);
  buttonNew.textContent = text;
  parent.append(buttonNew);

  return buttonNew;
}

export function h2Tag(className: string, parent: HTMLElement, text: string): HTMLHeadingElement {
  const title = document.createElement('h2');
  title.classList.add(className);
  title.textContent = text;
  parent.append(title);

  return title;
}

export function pTag(className: string, parent: HTMLElement, text: string): HTMLParagraphElement {
  const paragraph = document.createElement('p');
  paragraph.classList.add(className);
  paragraph.textContent = text;
  parent.append(paragraph);

  return paragraph;
}

export function aTag(className: string, parent: HTMLElement, text: string): HTMLAnchorElement {
  const link = document.createElement('a');
  link.href = 'https://github.com/Baltika-Cat';
  link.classList.add(className);
  link.textContent = text;
  parent.append(link);

  return link;
}