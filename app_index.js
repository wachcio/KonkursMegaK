const express = require('express');
const cors = require('cors');
const path = require('path');

const todoRouter = require('./routes/todo');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/todo', todoRouter);

module.exports = app;
