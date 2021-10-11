const express = require('express');
const cors = require('cors');
const path = require('path');

const todoAddRouter = require('./routes/todoAdd');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/todo/add', todoAddRouter);

module.exports = app;
