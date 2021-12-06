const { AocClient } = require('advent-of-code-client');
const { keys } = require('../config/keys');

const aocService = (year, day) => (new AocClient({
  year, day, token: keys.AOC_SESSION_COOKIE,
}));

module.exports = { aocService };
