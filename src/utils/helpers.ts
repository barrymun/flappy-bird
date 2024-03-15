function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateRandomPipeOffset(min: number, max: number) {
  return generateRandomNumber(min, max);
}
