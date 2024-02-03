export const createScoreTable = function(window, area) {
  let array = JSON.parse(localStorage.getItem('bestScores'));
  let areaChilds = [...area.childNodes];
  areaChilds.forEach ((item) => {
    area.removeChild(item);
  })
  if (window.lastChild.classList.contains('return-button')) {
    window.removeChild(window.lastChild);
  }
  if (array) {
    array.forEach (item => {
      let scoreLine = document.createElement('li');
      scoreLine.classList.add('score-line');
      scoreLine.textContent = `${item.name}, ${item.size}, ${item.time}`;
      area.append(scoreLine);
    })
  }
  let button = document.createElement('div');
  button.classList.add('button');
  button.classList.add('return-button');
  button.textContent = 'Return';
  window.append(button);
}