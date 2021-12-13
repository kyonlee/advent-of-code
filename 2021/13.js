const { aocService } = require('../service/aocc');

const client = aocService(2021, 13);

const foldPaper = (input, times) => {
  const dots = input
    .split('\n')
    .filter((line) => !(line === '' || line.includes('fold along')))
    .map((dot) => dot.split(',').map((number) => parseInt(number, 10)));

  let folds = input
    .split('\n')
    .filter((line) => line.includes('fold along'))
    .map((fold) => fold
      .replace('fold along', '')
      .trim()
      .split('=')
      .map((char) => {
        const parse = parseInt(char, 10);

        if (parse) {
          return parse;
        }
        return char;
      }));

  if (times) {
    folds = folds.slice(0, times);
  }

  const maxX = Math.max(...dots.map((dot) => dot[0]));
  const maxY = Math.max(...dots.map((dot) => dot[1]));

  let paper = new Array(maxY + 1)
    .fill(null)
    .map(() => Array(maxX + 1).fill('.'));

  dots.forEach((dot) => {
    paper[dot[1]][dot[0]] = '#';
  });

  folds.forEach(([axis, coord]) => {
    if (axis === 'y') {
      const top = paper.slice(0, coord);
      const bottom = paper.slice(coord + 1);
      bottom.reverse();
      const diff = Math.abs(top.length - bottom.length);

      if (top.length > bottom.length) {
        paper = [
          ...top.slice(0, diff),
          ...bottom.map((row, rowIndex) => row.map((point, pointIndex) => {
            if (top[rowIndex][pointIndex] === '#' || point === '#') {
              return '#';
            }
            return '.';
          })),
        ];
      } else {
        paper = [
          ...bottom.slice(0, diff),
          ...top.map((row, rowIndex) => row.map((point, pointIndex) => {
            if (bottom[rowIndex][pointIndex] === '#' || point === '#') {
              return '#';
            }
            return '.';
          })),
        ];
      }
    } else {
      const left = paper.map((row) => row.slice(0, coord));
      const right = paper.map((row) => row.slice(coord + 1).reverse());
      const diff = Math.abs(left[0].length - right[0].length);

      if (left[0].length > right[0].length) {
        const extraLeft = left.map((row) => row.slice(0, diff));
        paper = right.map((row, rowIndex) => [
          ...extraLeft[rowIndex],
          ...row.map((point, pointIndex) => {
            if (left[rowIndex][pointIndex + diff] === '#' || point === '#') {
              return '#';
            }
            return '.';
          }),
        ]);
      } else {
        const extraRight = right.map((row) => row.slice(0, diff));
        paper = left.map((row, rowIndex) => [
          ...extraRight[rowIndex],
          ...row.map((point, pointIndex) => {
            if (right[rowIndex][pointIndex + diff] === '#' || point === '#') {
              return '#';
            }
            return '.';
          }),
        ]);
      }
    }
  });

  return paper;
};

const part1 = (data) => {
  console.log(
    foldPaper(data, 1)
      .flat()
      .filter((point) => point !== '.').length,
  );
};

const part2 = (data) => {
  console.log(foldPaper(data));
};

const main = async () => {
  const input = await client.getInput();
  part1(input);
  part2(input);
};

if (require.main === module) {
  main();
}
