const { aocService } = require('../service/aocc');

const client = aocService(2021, 10);

const OPENERS = ['(', '[', '{', '<'];
const CLOSERS = [')', ']', '}', '>'];

const invalidInputFinder = (line) => {
  const chars = line.split('');

  const stack = [];

  let output;

  chars.some((char) => {
    if (OPENERS.includes(char)) {
      stack.push(char);
    }

    if (CLOSERS.includes(char)) {
      const lastOpener = stack.pop();
      if (CLOSERS.indexOf(char) !== OPENERS.indexOf(lastOpener)) {
        output = char;
        return true;
      }
    }
    return false;
  });

  if (!output) {
    return stack;
  }
  return output;
};

const part1 = (data) => {
  const lines = data.split('\n');

  const score = [3, 57, 1197, 25137];

  const invalids = lines
    .map((line) => invalidInputFinder(line))
    .filter((invalid) => typeof invalid !== 'object');

  const answer = invalids.map((invalid) => score[CLOSERS.indexOf(invalid)]);

  console.log(answer.reduce((acc, cur) => acc + cur));
};

const part2 = (data) => {
  const lines = data.split('\n');

  const score = [1, 2, 3, 4];

  const rests = lines
    .map((line) => invalidInputFinder(line))
    .filter((invalid) => typeof invalid !== 'string');

  const acScores = rests.map((rest) => {
    let inScore = 0;
    rest.reverse().forEach((char) => {
      inScore *= 5;
      inScore += score[OPENERS.indexOf(char)];
    });

    return inScore;
  });

  console.log(acScores.sort((a, b) => a - b)[Math.floor(acScores.length / 2)]);
};

const main = async () => {
  const input = await client.getInput();

  part1(input);
  part2(input);
};

if (require.main === module) {
  main();
}
