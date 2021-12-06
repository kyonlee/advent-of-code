/* eslint-disable no-loop-func */
const { transforms } = require('advent-of-code-client');
const { aocService } = require('../service/aocc');

const client = aocService(2021, 3);

client.setInputTransform(transforms.lines);

const getCommon = (data, less = false) => {
  const sumOfBinaryPosition = new Array(data[0].length).fill(0);
  data.forEach((binary) => {
    for (let i = 0; i < binary.length; i += 1) {
      sumOfBinaryPosition[i] += parseInt(binary.charAt(i), 10);
    }
  });

  if (less) {
    return sumOfBinaryPosition.map((count) => (count < data.length / 2 ? 1 : 0));
  }

  return sumOfBinaryPosition.map((count) => (count < data.length / 2 ? 0 : 1));
};

const part1 = (data) => {
  const gamma = getCommon(data).toString().replaceAll(',', '');
  const esp = getCommon(data, true).toString().replaceAll(',', '');

  console.log(parseInt(gamma, 2) * parseInt(esp, 2));
};

const part2 = (data) => {
  let filteredO = data;
  let filteredCO = data;

  for (let i = 0; i < data[0].length; i += 1) {
    if (filteredO.length > 1) {
      filteredO = filteredO.filter(
        (binary) => parseInt(binary.charAt(i), 10)
          === parseInt(getCommon(filteredO)[i], 10),
      );
    }

    if (filteredCO.length > 1) {
      filteredCO = filteredCO.filter(
        (binary) => parseInt(binary.charAt(i), 10)
          === parseInt(getCommon(filteredCO, true)[i], 10),
      );
    }
  }

  console.log(parseInt(filteredO[0], 2) * parseInt(filteredCO[0], 2));
};

const main = async () => {
  const input = await client.getInput();
  part1(input);
  part2(input);
};

if (require.main === module) {
  main();
}
