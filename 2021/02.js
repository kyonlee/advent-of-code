const { transforms } = require("advent-of-code-client");
const { aocService } = require("../service/aocc");

const client = aocService(2021, 2);

client.setInputTransform(transforms.lines);

const parseData = (data) => {
  return data.map((instruction) => {
    const parseInstruction = instruction.split(" ");
    parseInstruction[1] = parseInt(parseInstruction[1]);
    return parseInstruction;
  });
};

const part1 = (data) => {
  let forward = 0;
  let height = 0;
  data.map((data) => {
    if (data[0] === "forward") {
      forward += data[1];
    } else if (data[0] === "up") {
      height -= data[1];
    } else {
      height += data[1];
    }
  });
  console.log(forward * height);
};

const part2 = (data) => {
  let forward = 0;
  let aim = 0;
  let height = 0;
  data.map((data) => {
    if (data[0] === "forward") {
      forward += data[1];
      height += aim * data[1];
    } else if (data[0] === "up") {
      aim -= data[1];
    } else {
      aim += data[1];
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
