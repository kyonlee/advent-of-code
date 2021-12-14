/* eslint-disable no-loop-func */
const { aocService } = require('../service/aocc');

const client = aocService(2021, 14);

const letterCount = (data, steps) => {
  const polymer = data.split('\n')[0];

  const instructions = data.split('\n').slice(2);

  const mapping = {};
  let pairs = {};
  const letters = {};

  instructions.forEach((instruction) => {
    mapping[instruction.substring(0, 2)] = instruction.split('').pop();
  });

  for (let i = 0; i < polymer.length - 1; i += 1) {
    if (pairs[polymer.slice(i, i + 2)]) {
      pairs[polymer.slice(i, i + 2)] += 1;
    } else {
      pairs[polymer.slice(i, i + 2)] = 1;
    }
  }

  polymer.split('').forEach((char) => {
    if (letters[char]) {
      letters[char] += 1;
    } else {
      letters[char] = 1;
    }
  });

  for (let i = 0; i < steps; i += 1) {
    const newPairs = {};

    Object.keys(pairs).forEach((pair) => {
      const count = pairs[pair];

      const [left, right] = pair.split('');

      if (newPairs[`${left}${mapping[pair]}`]) {
        newPairs[`${left}${mapping[pair]}`] += count;
      } else {
        newPairs[`${left}${mapping[pair]}`] = count;
      }

      if (newPairs[`${mapping[pair]}${right}`]) {
        newPairs[`${mapping[pair]}${right}`] += count;
      } else {
        newPairs[`${mapping[pair]}${right}`] = count;
      }

      if (letters[mapping[pair]]) {
        letters[mapping[pair]] += count;
      } else {
        letters[mapping[pair]] = count;
      }
    });

    pairs = newPairs;
  }

  return letters;
};

const part1 = (data) => {
  const count = Object.values(letterCount(data, 10));
  console.log(Math.max(...count) - Math.min(...count));
};

const part2 = (data) => {
  const count = Object.values(letterCount(data, 40));
  console.log(Math.max(...count) - Math.min(...count));
};

const main = async () => {
  const input = await client.getInput();
  part1(input);
  part2(input);
};

if (require.main === module) {
  main();
}
