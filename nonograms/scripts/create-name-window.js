export const createNameWindow = function(window, nameArray) {
  let windowChilds = [...window.childNodes];
  windowChilds.forEach ((item) => {
    window.removeChild(item);
  })
  let title = document.createElement('h3');
  title.classList.add('title');
  title.textContent = 'Choose nonogram';
  window.append(title);
  let nameArea = document.createElement('div');
  nameArea.classList.add('name-area');
  window.append(nameArea);
  for (let i = 0; i < nameArray.length; i += 1) {
    let button = document.createElement('div');
    button.classList.add('button');
    button.textContent = nameArray[i];
    nameArea.append(button);
  }
  let button = document.createElement('div');
  button.classList.add('button');
  button.classList.add('return-button');
  button.textContent = 'Return';
  window.append(button);
}