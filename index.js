const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const prompts = require('./lib/prompts');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'daikon',
    database: 'company_db'
    },
    console.log(`Connected to company_db database.`)
);

function viewing() {
    inquirer.prompt([
        {
            name: 'viewSelect',
            type: 'list',
            loop: false,
            message: "What would you like to view?",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
            ],
        }
    ])
    .then((answer) => {
        switch (answer.viewSelect) {
            case 'View all departments':
                db.query('SELECT * FROM department', (err, results) => {
                    err
                    ? console.log(err)
                    : console.table(results);
                });
                break;
            case 'View all roles':
                db.query('SELECT * FROM role', (err, results) => {
                    err
                    ? console.log(err)
                    : console.table(results);
                });
            case 'View all employees':
                db.query('SELECT * FROM employee', (err, results) => {
                    err
                    ? console.log(err)
                    : console.table(results);
                });
                break;
            default:
                break;
        }
    })
    .then(init());
};

function adding() {
    inquirer.prompt([
        {
            name: 'viewAdd',
            type: 'select',
            loop: false,
            message: 'What would you like to add?',
            choices: [
                'Department',
                'Role',
                'Employee',
            ],
        }
    ])
    .then((answer) => {
        switch (answer.viewAdd) {
            case 'Department':
                inquirer.prompt([
                    {
                        name: 'depAdd',
                        type: 'input',
                        message: 'Please enter the new department name.',
                    }
                ]).then((response) => {
                    db.query('INSERT INTO department (dep_name) VALUES (?)', response.depAdd);
                });
                break;
            case 'Role':
                inquirer.prompt([
                    {
                        name: 'roleTitle',
                        type: 'input',
                        message: 'Please enter a role title.',
                    },
                    {
                        name: 'roleSalary',
                        type: 'input',
                        message: 'Please enter a role salary.',
                    },
                    {
                        name: 'roleDep',
                        type: 'input',
                        message: 'Please enter a role department ID.',
                    },
                ])
                .then((response) => {
                    db.query('INSERT INTO role (title, salary, dep_id) VALUES (?, ?, ?)', response.roleTitle, response.roleSalary, response.roleDep);
                });
                break;
            case 'Employee':
                inquirer.prompt([
                    {
                        name: 'firstName',
                        type: 'input',
                        message: 'Please enter employee first name.',
                    },
                    {
                        name: 'lastName',
                        type: 'input',
                        message: 'Please enter employee last name.',
                    },
                    {
                        name: 'roleId',
                        type: 'input',
                        message: 'Please enter employee role ID.',
                    },
                    {
                        name: 'managerId',
                        type: 'input',
                        message: 'Please enter employee manager ID. If none, put null.',
                    },
                ])
                .then((answers) => {
                    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', answers.firstName, answers.lastName, answers.roleId, answers.managerId);
                });
                break;
            default:
                break;
        }
        init();
    });
};

function deleting() {
    
};

function budgeting() {
    
};

function init() {
    inquirer.prompt(prompts.mainMenuPrompt).then((answers) => {
        switch (answers.main) {
            case 'View department, role, or employee':
                viewing();
                break;
            case 'Add department, role, or employee':
                adding();
                break;
            case 'Update employee':
                updating();
                break;
            case 'Delete department, role, or employee':
                deleting();
                break;
            case 'Calculate department budget':
                budgeting();
                break;
            default:
                break;
        }
    });
}

init();