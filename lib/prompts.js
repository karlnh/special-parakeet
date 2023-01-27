const inquirer = require('inquirer');

const mainMenuPrompt = [
    {
        name: 'main',
        type: 'list',
        loop: false,
        message: 'What would you like to do?',
        choices: [
            'View department, role, or employee',
            'Add department, role, or employee',
            'Update employee',
            'Delete department, role, or employee',
            'Calculate department budget',
            'Exit',
        ],
    }
];

module.exports = { mainMenuPrompt };