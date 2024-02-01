export const createSizeWindow = function(window) {
  let windowChilds = [...window.childNodes];
  windowChilds.forEach ((item) => {
    window.removeChild(item);
  })
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
  let continueRandomBlock = document.createElement('div');
  continueRandomBlock.classList.add('continue-random-block');
  window.append(continueRandomBlock);

  let continueButton = document.createElement('div');
  continueButton.classList.add('button');
  continueButton.textContent = 'Continue nonogram';
  continueRandomBlock.append(continueButton);

  let randomButton = document.createElement('div');
  randomButton.classList.add('button');
  randomButton.textContent = 'Random nonogram';
  continueRandomBlock.append(randomButton);

  let button = document.createElement('div');
  button.classList.add('button');
  button.classList.add('return-button');
  button.textContent = 'Return';
  window.append(button);
}