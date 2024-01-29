export const createSizeWindow = function(window) {
  let title = document.createElement('h3');
  title.classList.add('title');
  title.textContent = 'Choose size';
  window.append(title);
  let sizeArea = document.createElement('div');
  sizeArea.classList.add('size-area');
  window.append(sizeArea);
  for (let i = 1; i <= 3; i += 1) {
    let button = document.createElement('div');
    button.classList.add('button');
    button.textContent = `${5 * i}x${5 * i}`;
    sizeArea.append(button);
  }
  let button = document.createElement('div');
  button.classList.add('button');
  button.classList.add('return-button');
  button.textContent = 'Return';
  window.append(button);
}