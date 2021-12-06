/* eslint-disable no-restricted-syntax */
const { transforms } = require('advent-of-code-client');
const { aocService } = require('../service/aocc');

const client = aocService(2021, 5);

client.setInputTransform(transforms.lines);

const countOverlap = (data, diagonal = false) => {
  const maxXY = Math.max(...data.flat()) + 1;
  const field = new Array(maxXY).fill(null).map(() => new Array(maxXY).fill(0));

  for (const line of data) {
    const steps = line[2] !== line[0]
      ? Math.abs(line[2] - line[0]) + 1
      : Math.abs(line[3] - line[1]) + 1;

    let deltaX;
    let deltaY;

    if (line[2] !== line[0]) {
      if (line[2] > line[0]) {
        deltaX = 1;
      } else {
        deltaX = -1;
      }
    } else {
      deltaX = 0;
    }

    if (line[3] !== line[1]) {
      if (line[3] > line[1]) {
        deltaY = 1;
      } else {
        deltaY = -1;
      }
    } else {
      deltaY = 0;
    }

    if (!diagonal && deltaX !== 0 && deltaY !== 0) {
      continue;
    }

    for (let step = 0; step < steps; step += 1) {
      field[line[1] + deltaY * step][line[0] + deltaX * step] += 1;
    }
  }

  return field.flat().filter((n) => n > 1).length;
};

const part1 = (data) => {
  console.log(countOverlap(data));
};

const part2 = (data) => {
  console.log(countOverlap(data, true));
};

const main = async () => {
  const input = await client.getInput();
  const lines = input.map((line) => line.split(/,|\s+->\s+/).map((point) => parseInt(point, 10)));

  part1(lines);
  part2(lines);
};

if (require.main === module) {
  main();
}
