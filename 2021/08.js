const { aocService } = require('../service/aocc');

const client = aocService(2021, 8);

const charInclude = (big, small) => {
  let output = true;

  const chars = small.split('');

  chars.forEach((char) => {
    if (!big.includes(char)) {
      output = false;
    }
  });

  return output;
};

const charDiff = (big, small) => {
  const bigChars = big.split('');
  const smallChars = small.split('');

  smallChars.forEach((char) => {
    if (bigChars.includes(char)) {
      bigChars.splice(bigChars.indexOf(char), 1);
    }
  });

  return bigChars;
};

const codeCracker = (codes) => {
  const output = new Array(10).fill(null);

  codes.forEach((code, index) => {
    if (code.length === 2) {
      output[index] = 1;
    } else if (code.length === 3) {
      output[index] = 7;
    } else if (code.length === 4) {
      output[index] = 4;
    } else if (code.length === 7) {
      output[index] = 8;
    }
  });

  codes.forEach((code, index) => {
    if (code.length === 5 && charInclude(code, codes[output.indexOf(1)])) {
      output[index] = 3;
    } else if (
      code.length === 6
      && !charInclude(code, codes[output.indexOf(1)])
    ) {
      output[index] = 6;
    }
  });

  codes.forEach((code, index) => {
    if (code.length === 6 && charInclude(code, codes[output.indexOf(3)])) {
      output[index] = 9;
    }
  });

  const botLeftChar = charDiff(
    codes[output.indexOf(8)],
    codes[output.indexOf(9)],
  );

  codes.forEach((code, index) => {
    if (
      code.length === 5
      && code.includes(...botLeftChar)
      && output[index] === null
    ) {
      output[index] = 2;
    }
  });

  codes.forEach((code, index) => {
    if (code.length === 5 && output[index] === null) {
      output[index] = 5;
    } else if (code.length === 6 && output[index] === null) {
      output[index] = 0;
    }
  });

  return output;
};

const part1 = (data) => {
  const numbers = data
    .split('\n')
    .map((lines) => lines
      .substring(lines.indexOf('|') + 1)
      .trim()
      .split(/\s+/))
    .flat()
    .map((line) => line.length);

  const answer = [2, 4, 3, 7];

  let count = 0;

  numbers.forEach((number) => {
    if (answer.includes(number)) {
      count += 1;
    }
  });

  console.log(count);
};

const part2 = (data) => {
  const lines = data.split('\n');

  let sum = 0;

  lines.forEach((input) => {
    const line = input
      .split(/\s+/)
      .map((code) => code.split('').sort().join(''));

    const codes = line.slice(0, 10);
    const numbers = line.slice(11);

    const crackedCode = codeCracker(codes);
    const crackedNumbers = [];

    numbers.forEach((number) => {
      crackedNumbers.push(crackedCode[codes.indexOf(number)]);
    });

    sum += parseInt(crackedNumbers.join(''), 10);
  });

  console.log(sum);
};

const main = async () => {
  const input = await client.getInput();

  part1(input);
  part2(input);
};

if (require.main === module) {
  main();
}
