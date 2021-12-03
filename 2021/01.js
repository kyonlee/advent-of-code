const { transforms } = require('advent-of-code-client');
const { aocService } = require('../service/aocc');

const client = aocService(2021, 1);

client.setInputTransform(transforms.numbers);

const increaseCount = (data) => {
  let count = 0;
  for (let i = 1; i < data.length; i += 1) {
    if (data[i] > data[i - 1]) {
      count += 1;
    }
  }
  return count;
};

const summedInputs = (data) => {
  const output = [];
  for (let i = 0; i < data.length; i += 1) {
    output.push(data[i] + data[i + 1] + data[i + 2]);
  }
  return output;
};

const part1 = (data) => {
  console.info(increaseCount(data));
};

const part2 = (data) => {
  console.info(increaseCount(summedInputs(data)));
};

const main = async () => {
  const input = await client.getInput();
  part1(input);
  part2(input);
};

if (require.main === module) {
  main();
}
