export function getCoords(element: HTMLDivElement) {
  const top = element.getBoundingClientRect().top;
  const left = element.getBoundingClientRect().left;
  const coords = {
    top: top,
    left: left
  }
  return coords;
}