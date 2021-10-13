const { DB_PATH } = require('./variables');

const { writeFile, readFile } = require('fs').promises;

const isDBFile = async () => {
  try {
    await readFile(DB_PATH, 'utf-8');
    return true;
  } catch (err) {
    return false;
  }
};

const readToDB = async () => {
  if (await isDBFile()) {
    return JSON.parse(await readFile(DB_PATH, 'utf-8'));
  } else {
    return [];
  }
};
const writeToDB = async data => {
  return await writeFile(DB_PATH, JSON.stringify(data), 'utf-8');
};
const deleteInDB = async (id, tasks) => {
  const idx = tasks.findIndex(task => task.id === id);

  if (idx >= 0) {
    return tasks.splice(idx, 1);
  } else {
    return tasks;
  }
};

const updateDB = async (updatedTask, tasks) => {
  const idx = tasks.findIndex(task => task.id === updatedTask.id);

  if (idx >= 0) {
    tasks[idx] = updatedTask;
  }
  return tasks;
};

module.exports = { readToDB, writeToDB, deleteInDB, updateDB };
