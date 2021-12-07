/* eslint-disable no-restricted-syntax */
const { aocService } = require('../service/aocc');

const client = aocService(2021, 6);

const part1 = (data) => {
  const fishes = [...data];
  let newFishes = [];

  for (let day = 0; day < 80; day += 1) {
    for (let i = 0; i < fishes.length; i += 1) {
      if (fishes[i] === 0) {
        fishes[i] = 6;
        newFishes.push(8);
      } else {
        fishes[i] -= 1;
      }
    }
    fishes.push(...newFishes);
    newFishes = [];
  }

  console.log(fishes.flat().length);
};

const part2 = (data) => {
  const fishes = [...data];
  let newFishes = [];

  const initialCountFishes = new Array(10).fill(0);
  const countFishes = [];

  for (let day = 0; day < 10; day += 1) {
    for (let i = 0; i < fishes.length; i += 1) {
      if (fishes[i] === 0) {
        initialCountFishes[day] += 1;
        fishes[i] = 6;
        newFishes.push(8);
      } else {
        fishes[i] -= 1;
      }
    }
    fishes.push(...newFishes);
    newFishes = [];
  }

  for (let day = 0; day < 256; day += 1) {
    if (day < 10) {
      countFishes.push(initialCountFishes[day]);
    } else {
      countFishes.push(countFishes[day - 7] + countFishes[day - 9]);
    }
  }

  console.log(countFishes.reduce((acc, cur) => acc + cur) + data.length);
};

const main = async () => {
  const input = await client.getInput();
  const fishes = input.split(',').map((fish) => parseInt(fish, 10));

  part1(fishes);
  part2(fishes);
};

if (require.main === module) {
  main();
}
