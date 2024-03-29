export default function getRandomColor(): string {
  const red = Math.round(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');
  const green = Math.round(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');
  const blue = Math.round(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${red}${green}${blue}`;
}
