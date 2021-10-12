const { DB_PATH } = require('./variables');
let { tasks } = require('./variables');

const { writeFile, readFile } = require('fs').promises;

const isDBFile = async () => {
  try {
    await readFile(DB_PATH, 'utf-8');
    return true;
  } catch (err) {
    // await writeFile(
    //   DB_PATH,
    //   JSON.stringify([
    //     {
    //       name: 'pierwszy',
    //       done: false,
    //     },
    //   ]),
    //   'utf-8',
    // );
    return false;
  }
};

const readToDB = async () => {
  if (await isDBFile()) {
    return JSON.parse(await readFile(DB_PATH, 'utf-8'));
  } else {
    return {};
  }
};
const writeToDB = async data => {
  return await writeFile(DB_PATH, JSON.stringify(data), 'utf-8');
};

module.exports = { readToDB, writeToDB };
