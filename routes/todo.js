const express = require('express');
const router = express.Router();
const { readToDB, writeToDB } = require('../helpers/workWithDB');
let tasks = [];

/* GET home page. */
router.get('/', async (req, res, next) => {
  tasks = await readToDB();
  res.json(tasks);
});
router.post('/', async (req, res, next) => {
  tasks = await readToDB();
  tasks = [...tasks, req.body];
  await writeToDB(tasks);

  res.json(tasks);
});

module.exports = router;
