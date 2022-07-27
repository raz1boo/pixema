export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const number = Math.floor(Math.random() * (max - min)) + min;
  return number !== 6 && number;
}
