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

export function aTag(className: string, parent: HTMLElement, link: string, text: string): HTMLAnchorElement {
  const linkNew = document.createElement('a');
  linkNew.href = link;
  linkNew.classList.add(className);
  linkNew.textContent = text;
  parent.append(linkNew);

  return linkNew;
}

export function ul(className: string, parent: HTMLDivElement) {
  const list = document.createElement('ul');
  list.classList.add(className);
  parent.append(list);

  return list;
}

export function li(className: string, parent: HTMLUListElement, user: string) {
  const listItem = document.createElement('li');
  listItem.classList.add(className);
  const userStatusWrapper = div('user-status-wrapper', listItem);
  div('user-status', userStatusWrapper);
  pTag('active-user-name', listItem, user);
  div('unread-messages-count', listItem);
  parent.append(listItem);

  return listItem;
}
