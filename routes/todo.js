const express = require('express');
const router = express.Router();
const { readToDB, writeToDB, deleteInDB } = require('../helpers/workWithDB');
const { v4: uuidv4 } = require('uuid');
let tasks = [];

/* GET home page. */
router.get('/', async (req, res, next) => {
  tasks = await readToDB();
  res.json(tasks);
});
router.post('/', async (req, res, next) => {
  tasks = await readToDB();
  req.body.id = uuidv4();
  tasks = [...tasks, req.body];
  await writeToDB(tasks);

  res.json(tasks);
});
router.put('/', async (req, res, next) => {
  tasks = await readToDB();
  res.json(tasks);
});
router.delete('/', async (req, res, next) => {
  tasks = await readToDB();
  await writeToDB(await deleteInDB(req.body.id, tasks));
  res.json(tasks);
});

module.exports = router;
