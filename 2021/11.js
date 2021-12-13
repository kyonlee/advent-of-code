/* eslint-disable no-unused-vars */
const { aocService } = require('../service/aocc');

const client = aocService(2021, 11);

const step = (data) => {
  const map = data.map((number) => number + 1);

  do {
    map.forEach((number, index) => {
      if (!(number > 9)) {
        return;
      }

      map[index] = 0;

      const aroundNumbers = [
        index - 10,
        index - 9,
        index + 1,
        index + 11,
        index + 10,
        index + 9,
        index - 1,
        index - 11,
      ];

      if (index % 10 === 0) {
        aroundNumbers[5] = undefined;
        aroundNumbers[6] = undefined;
        aroundNumbers[7] = undefined;
      }

      if (index % 10 === 9) {
        aroundNumbers[1] = undefined;
        aroundNumbers[2] = undefined;
        aroundNumbers[3] = undefined;
      }

      if (Math.floor(index / 10) === 0) {
        aroundNumbers[0] = undefined;
        aroundNumbers[1] = undefined;
        aroundNumbers[7] = undefined;
      }

      if (Math.floor(index / 10) === Math.floor(map.length / 10) - 1) {
        aroundNumbers[3] = undefined;
        aroundNumbers[4] = undefined;
        aroundNumbers[5] = undefined;
      }

      aroundNumbers
        .filter((a) => a !== undefined)
        .forEach((a) => {
          if (map[a] !== 0) {
            map[a] += 1;
          }
        });
    });
  } while (map.filter((number) => number > 9).length !== 0);

  return [map.filter((number) => number === 0).length, map];
};

const part1 = (data) => {
  let mutableData = [...data];

  let count = 0;

  for (let i = 0; i < 100; i += 1) {
    const [flashCount, ouput] = step(mutableData);
    count += flashCount;
    mutableData = ouput;
  }

  console.log(count);
};

const part2 = (data) => {
  let mutableData = [...data];

  let stepCount = 0;

  do {
    stepCount += 1;
    const [_, ouput] = step(mutableData);
    mutableData = ouput;
  } while (mutableData.filter((number) => number !== 0).length !== 0);

  console.log(stepCount);
};

const main = async () => {
  const input = await client.getInput();

  const data = input
    .split('\n')
    .map((line) => line.split('').map((number) => parseInt(number, 10)))
    .flat();

  part1(data);
  part2(data);
};

if (require.main === module) {
  main();
}
