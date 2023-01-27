const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { mainMenuPrompt, employeesByManager, employeesByDepartment } = require('./lib/prompts');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'daikon',
    database: 'company_db'
    },
    console.log(`Connected to company_db database.`)
);

function ask() {
    inquirer.prompt(mainMenuPrompt).then((answers) => {
        switch (answers.menu) {
            case 'View all departments':
                db.query('SELECT * FROM department', (err, results) => {
                    console.log('\n');
                    console.table(results);
                });
                break;
            case 'View all roles':
                db.query('SELECT * FROM role', (err, results) => {
                    console.log('\n');
                    console.table(results);
                });
                break;
            case 'View all employees':
                db.query('SELECT * FROM employee', (err, results) => {
                    console.log('\n');
                    console.table(results);
                });
                break;
            case 'View employees by manager ID':
                inquirer.prompt(employeesByManager).then((answer) => {
                    const response = Number(answer.managerID);
                    db.query('SELECT * FROM employee WHERE manager_id = ?', response, (err, results) => {
                        console.log('\n');
                        console.table(results);
                    });
                });
            default:
                console.log("Epic fail.");
        };
        ask();
    });
}

ask();