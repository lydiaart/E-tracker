const mysql = require('mysql2');
const util = require('util');
require("dotenv").config();

const conn = mysql.createConnection({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const query = util.promisify(conn.query).bind(conn);


module.exports = query;