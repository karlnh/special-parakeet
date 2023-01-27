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
                    : console.table('\n', results);
                });
                break;
            case 'View all roles':
                db.query('SELECT * FROM role', (err, results) => {
                    err
                    ? console.log(err)
                    : console.table('\n', results);
                });
            case 'View all employees':
                db.query('SELECT * FROM employee', (err, results) => {
                    err
                    ? console.log(err)
                    : console.table('\n', results);
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
        let text = answer.viewAdd;
        let userAnswer = text.toLowerCase();
        switch (userAnswer) {
            case 'department':
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
            case 'role':
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
                    db.query('INSERT INTO role (title, salary, dep_id) VALUES (?, ?, ?)', response.roleTitle, response.roleSalary, response.roleDep, (err, response) => {
                        console.log(response);
                    });
                });
                break;
            case 'employee':
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
                    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', answers.firstName, answers.lastName, answers.roleId, answers.managerId, (err, response) => {
                        console.log(response);
                    });
                });
                break;
            default:
                break;
        };
        init();
    });
};

function deleting() {
    inquirer.prompt([
    {
        name: 'viewDelete',
        type: 'select',
        message: 'What would you like to delete?',
        choices: [
            'Department',
            'Role',
            'Employee'
        ],
    }
    ])
    .then((answer) => {
        let text = answer.viewDelete;
        let userAnswer = text.toLowerCase();
        switch (userAnswer) {
            case 'department':
                inquirer.prompt([
                    {
                        name: 'depDelete',
                        type: 'input',
                        message: 'Enter the ID of the department to delete.'
                    }
                ])
                .then((response) => {
                    let deletedDepartment = response;
                    db.query('DELETE FROM department WHERE id = ?', deletedDepartment, (err, result) => {
                        console.log("Deleted " + deletedDepartment);
                    });
                });
                break;
            case 'role':
                inquirer.prompt([
                    {
                        name: 'roleDelete',
                        type: 'input',
                        message: 'Enter the ID of the role to delete.'
                    }
                ])
                .then((response) => {
                    let deletedRole = response;
                    db.query('DELETE FROM role WHERE id = ?', deletedRole, (err, result) => {
                        console.log("Deleted " + deletedRole);
                    });
                });
                break;
            case 'employee':
                inquirer.prompt([
                    {
                        name: 'empDelete',
                        type: 'input',
                        message: 'Enter the ID of the employee to delete.'
                    }
                ])
                .then((response) => {
                    let deletedEmp = response;
                    db.query('DELETE FROM employee WHERE id = ?', deletedEmp, (err, result) => {
                        console.log("Deleted " + deletedEmp);
                    });
                });
                break;
            default:
                break;
        }
        init();
    });
};

function budgeting() {
    db.query('SELECT SUM(salary) AS total_budget FROM employee JOIN role ON employee.role_id = role.id;', (err, result) => {
        console.log('\n');
        console.table(result);
    });
    // figuring this out was the worst thing ever.
    init();
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
            case 'Exit':
                break;
            default:
                break;
        }
    });
}

init();