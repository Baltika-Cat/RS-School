export default function getCoords(element: HTMLDivElement): number {
  const { left } = element.getBoundingClientRect();
  return left;
}
