/* eslint-disable no-restricted-syntax */
const { aocService } = require('../service/aocc');

const client = aocService(2021, 7);

const median = (numbers) => {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

const calculateFuel = (number) => (number * (number + 1)) / 2;

const average = (numbers) => numbers.reduce((acc, cur) => acc + cur) / numbers.length;

const part1 = (data) => {
  const point = median(data);
  let fuel = 0;

  for (const position of data) {
    fuel += Math.abs(position - point);
  }

  console.log(fuel);
};

const part2 = (data) => {
  const point = Math.floor(average(data));
  let fuel = 0;

  for (const position of data) {
    fuel += calculateFuel(Math.abs(position - point));
  }

  console.log(fuel);
};

const main = async () => {
  const input = await client.getInput();
  const positions = input.split(',').map((number) => parseInt(number, 10));

  part1(positions);
  part2(positions);
};

if (require.main === module) {
  main();
}
