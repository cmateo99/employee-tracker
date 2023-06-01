const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const makeConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password1234',
    database: 'company_db',
});

makeConnection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
    startApp();
});

function startApp() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View departments',
                'View roles',
                'View employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    connection.end();
                    console.log('Disconnected from the database.');
                    break;
            }
        });
}
function viewDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
function viewRoles() {
    const query = `
    SELECT role.id, role.title, role.salary, department.name AS department_name
    FROM role
    JOIN department ON role.department_id = department.id
  `;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

function viewEmployees() {
    const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, CONCAT(man.first_name, ' ', man.last_name) AS manager_name
    FROM employee AS emplpyee
    JOIN role ON employee.role_id = role.id
    LEFT JOIN employee AS man ON employee.manager_id = man.id
  `;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
function addDepartment() {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'Enter the name of the department:',
        })
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.department,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log('Department added successfully!');
                    startApp();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the title of the role:',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary for the role:',
            },
            {
                name: 'department',
                type: 'input',
                message: 'Enter the department ID for the role:',
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log('Role added successfully!');
                    startApp();
                }
            );
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: "Enter the employee's first name:",
            },
            {
                name: 'last_name',
                type: 'input',
                message: "Enter the employee's last name:",
            },
            {
                name: 'role',
                type: 'input',
                message: "Enter the employee's role ID:",
            },
            {
                name: 'manager',
                type: 'input',
                message: "Enter the manager ID for the employee (if applicable):",
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role,
                    manager_id: answer.manager || null,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    startApp();
                }
            );
        });
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                name: 'employee_id',
                type: 'input',
                message: 'Enter the ID of the employee to update:',
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'Enter the new role ID for the employee:',
            },
        ])
        .then((answer) => {
            connection.query(
                'UPDATE employee SET role_id = ? WHERE id = ?',
                [answer.role_id, answer.employee_id],
                (err, res) => {
                    if (err) throw err;
                    console.log('Employee role updated successfully!');
                    startApp();
                }
            );
        });
}