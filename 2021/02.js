const { transforms } = require('advent-of-code-client');
const { aocService } = require('../service/aocc');

const client = aocService(2021, 2);

client.setInputTransform(transforms.lines);

const parseData = (data) => data.map((instruction) => {
  const parseInstruction = instruction.split(' ');
  parseInstruction[1] = parseInt(parseInstruction[1], 10);
  return parseInstruction;
});

const part1 = (data) => {
  let forward = 0;
  let height = 0;
  data.forEach((instruction) => {
    if (instruction[0] === 'forward') {
      forward += instruction[1];
    } else if (instruction[0] === 'up') {
      height -= instruction[1];
    } else {
      height += instruction[1];
    }
  });
  console.log(forward * height);
};

const part2 = (data) => {
  let forward = 0;
  let aim = 0;
  let height = 0;
  data.forEach((instruction) => {
    if (instruction[0] === 'forward') {
      forward += instruction[1];
      height += aim * instruction[1];
    } else if (instruction[0] === 'up') {
      aim -= instruction[1];
    } else {
      aim += instruction[1];
    }
  });
  console.log(forward * height);
};

const main = async () => {
  const input = await client.getInput();
  part1(parseData(input));
  part2(parseData(input));
};

if (require.main === module) {
  main();
}
