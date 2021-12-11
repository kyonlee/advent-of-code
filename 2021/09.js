/* eslint-disable no-empty */
const { aocService } = require('../service/aocc');

const client = aocService(2021, 9);

const basinSizeFinder = (row, col, map) => {
  let count = 0;
  const checkedPoints = [];

  const pathfinder = (x, y) => {
    if (map[x][y] === 9) return;
    count += 1;
    checkedPoints.push(`${x},${y}`);

    try {
      if (
        map[x - 1][y] > map[x][y]
        && !checkedPoints.includes(`${x - 1},${y}`)
      ) {
        pathfinder(x - 1, y);
      }
    } catch {}
    try {
      if (
        map[x][y + 1] > map[x][y]
        && !checkedPoints.includes(`${x},${y + 1}`)
      ) {
        pathfinder(x, y + 1);
      }
    } catch {}
    try {
      if (
        map[x + 1][y] > map[x][y]
        && !checkedPoints.includes(`${x + 1},${y}`)
      ) {
        pathfinder(x + 1, y);
      }
    } catch {}
    try {
      if (
        map[x][y - 1] > map[x][y]
        && !checkedPoints.includes(`${x},${y - 1}`)
      ) {
        pathfinder(x, y - 1);
      }
    } catch {}
  };

  pathfinder(row, col);

  return count;
};

const aroundIndexes = (row, col, map) => {
  const surroundNumbers = [];

  try {
    surroundNumbers.push(map[row - 1][col]);
  } catch {}
  try {
    surroundNumbers.push(map[row][col + 1]);
  } catch {}
  try {
    surroundNumbers.push(map[row + 1][col]);
  } catch {}
  try {
    surroundNumbers.push(map[row][col - 1]);
  } catch {}

  return surroundNumbers.filter((number) => number !== undefined);
};

const part1 = (data) => {
  let count = 0;

  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      if (data[i][j] < Math.min(...aroundIndexes(i, j, data))) {
        count += data[i][j] + 1;
      }
    }
  }

  console.log(count);
};

const part2 = (data) => {
  const basinSize = [];

  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      if (data[i][j] < Math.min(...aroundIndexes(i, j, data))) {
        basinSize.push(basinSizeFinder(i, j, data));
      }
    }
  }

  console.log(
    basinSize
      .sort((a, b) => a - b)
      .reverse()
      .slice(0, 3)
      .reduce((acc, cur) => acc * cur),
  );
};

const main = async () => {
  const input = await client.getInput();

  const map = input
    .split('\n')
    .map((row) => row.split('').map((number) => parseInt(number, 10)));

  part1(map);
  part2(map);
};

if (require.main === module) {
  main();
}
