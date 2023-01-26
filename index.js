const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = '';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: db
});

connection.query(
    'Select * FROM ?', [db], (err, results) => {
        console.log(results);
    }
);