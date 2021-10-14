const express = require('express');
const router = express.Router();
const { readToDB, writeToDB, deleteInDB, updateDB } = require('../helpers/workWithDB');
const { v4: uuidv4 } = require('uuid');
let tasks = [];

router.get('/', async (req, res, next) => {
  tasks = await readToDB();
  res.json(tasks);
});

router.post('/', async (req, res, next) => {
  tasks = await readToDB();
  req.body.id = uuidv4();

  if (tasks.length >= 0) {
    tasks = [...tasks, req.body];
  } else {
    tasks = [req.body];
  }
  await writeToDB(tasks);

  res.json(tasks);
});

router.put('/', async (req, res, next) => {
  tasks = await readToDB();

  await updateDB(req.body, tasks);
  await writeToDB(tasks);
  res.json(tasks);
});

router.delete('/', async (req, res, next) => {
  tasks = await readToDB();
  await deleteInDB(req.body.id, tasks);
  await writeToDB(tasks);
  res.json(tasks);
});

module.exports = router;
