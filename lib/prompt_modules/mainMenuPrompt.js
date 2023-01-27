const mainMenuPrompt = [
    {
        name: 'mainMenuPrompt',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'View employees by manager', 'View employees by department',
        new inquirer.Separator(),
        'Add department', 'Add role', 'Add employee',
        new inquirer.Separator(),
        'Update employee role', 'Update employee manager',
        new inquirer.Separator(),
        'Delete department', 'Delete role', 'Delete employee',
        new inquirer.Separator(),
        'View department budget',
        new inquirer.Separator(),
        'Exit'],
    }
];

module.exports = mainMenuPrompt;