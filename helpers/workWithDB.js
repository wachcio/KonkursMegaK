const { DB_PATH } = require('./variables');

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
const deleteInDB = async (id, tasks) => {
  //   console.log({ id, tasks });

  const idx = tasks.findIndex(task => task.id === id);
  tasks.splice(idx, 1);

  if (idx >= 0) {
    return tasks;
  } else {
    return false;
  }
};

module.exports = { readToDB, writeToDB, deleteInDB };
