const inquirer = require('inquirer');

const mainMenuPrompt = [
    {
        name: 'menu',
        type: 'list',
        loop: false,
        message: 'What would you like to do?',
        choices: [
        'View all departments', 'View all roles', 'View all employees', 'View employees by manager', 'View employees by department',
        'Add department', 'Add role', 'Add employee',
        'Update employee role', 'Update employee manager',
        'Delete department', 'Delete role', 'Delete employee',
        'View department budget',
        'Exit',
        new inquirer.Separator()
        ],
    }
];

const employeesByManager = [
    {
        name: 'managerID',
        type: 'input',
        message: 'Please enter manager ID:',
    },
];

const employeesByDepartment = [
    {
        name: 'departmentID',
        type: 'input',
        message: 'Please enter department ID:',
    },
];

module.exports = { mainMenuPrompt, employeesByManager, employeesByDepartment };