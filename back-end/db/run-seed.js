const devData = require('../db/dev-data/index.js')
const seed = require('./seed.js');
const db = require('./index.js');

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();