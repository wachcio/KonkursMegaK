const { join } = require('path');

const DB_PATH = join(__dirname, '../DB/db.json');
let tasks;

module.exports = { DB_PATH, tasks };
