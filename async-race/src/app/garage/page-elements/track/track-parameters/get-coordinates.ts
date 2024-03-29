export default function getCoords(element: HTMLDivElement) {
  const { top } = element.getBoundingClientRect();
  const { left } = element.getBoundingClientRect();
  const coords = {
    top,
    left,
  };
  return coords;
}
