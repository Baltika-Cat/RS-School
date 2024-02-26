export const removeHintGrid = function(topHint, leftHint, grid) {
  let topHintChilds = [...topHint.childNodes];
  let leftHintChilds = [...leftHint.childNodes];
  let gridChilds = [...grid.childNodes];
  topHintChilds.forEach (item => topHint.removeChild(item));
  leftHintChilds.forEach (item => leftHint.removeChild(item));
  gridChilds.forEach (item => grid.removeChild(item));
}