/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
const { transforms } = require('advent-of-code-client');
const { aocService } = require('../service/aocc');

const client = aocService(2021, 4);

client.setInputTransform(transforms.lines);

const getDrawnNumbers = (data) => data[0].split(',').map((number) => parseInt(number, 10));

const getListOfBoards = (data) => {
  const list = [];

  let board = [];

  data.forEach((line) => {
    if (!line) {
      list.push(board);
      board = [];
    } else {
      board.push(
        ...line
          .trim()
          .split(/\s+/)
          .map((number) => parseInt(number, 10)),
      );
    }
  });

  list.push(board);

  return list;
};

const winChecker = (board) => {
  const col = new Array(5).fill(0);
  const row = new Array(5).fill(0);

  for (let i = 0; i < board.length; i += 1) {
    col[i % 5] += board[i];
    row[Math.floor(i / 5)] += board[i];
  }

  if (col.includes(-5) || row.includes(-5)) {
    return true;
  }

  return false;
};

const part1 = (numbers, data) => {
  numbers.some((number) => data.some((board) => {
    if (board.includes(number)) {
      board[board.indexOf(number)] = -1;
      const winBoard = winChecker(board);
      if (winBoard) {
        console.log(
          board
            .filter((boardNumber) => boardNumber !== -1)
            .reduce((acc, cur) => acc + cur, 0) * number,
        );
        return true;
      }
    }
    return false;
  }));
};

const part2 = (numbers, data) => {
  let listOfBoards = data;
  let filteredOutWins = [];

  numbers.forEach((number) => {
    filteredOutWins = [];
    listOfBoards.forEach((board) => {
      if (board.includes(number)) {
        board[board.indexOf(number)] = -1;
        const winBoard = winChecker(board);
        if (winBoard) {
          listOfBoards.length === 1
            && console.log(
              board
                .filter((boardNumber) => boardNumber !== -1)
                .reduce((acc, cur) => acc + cur, 0) * number,
            );
        } else {
          filteredOutWins.push(board);
        }
      } else {
        filteredOutWins.push(board);
      }
    });
    listOfBoards = filteredOutWins;
  });
};

const main = async () => {
  const input = await client.getInput();

  const drawnNumbers = getDrawnNumbers(input);
  const listOfBoards = getListOfBoards(input.slice(2));

  part1(drawnNumbers, listOfBoards);
  part2(drawnNumbers, listOfBoards);
};

if (require.main === module) {
  main();
}
