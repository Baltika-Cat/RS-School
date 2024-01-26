export const checkCrossword = function (currentArray, rightArray) {
  if (currentArray.join('') === rightArray.join('')) {
    console.log('WIN!!!!');
  }
}