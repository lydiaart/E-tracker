const query = require('./connection');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');
const figlet = require('figlet');


const questions = {
    type: "list",
    name: "selections",
    message: "What would you like to do? (Required)",
    choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role"]
}


figlet.text('EMPLOYEE MANAGER', {
    font: 'big',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 100,
    whitespaceBreak: true
}, function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    menu()



});

function menu() {

    inquirer.prompt(questions)
        .then(answer => {
            if (answer.selections === "view all departments") {
                viewDepartment();
            }
            else if (answer.selections === "view all roles") {
                viewRole();
            }
            else if (answer.selections === "view all employees") {
                viewEmployees();
            }
            else if (answer.selections === "add a department") {
                addDepartment();
            }
            else if (answer.selections === "add a role") {
                addRole();
            }
            else if (answer.selections === "add an employee") {
                addEmployee();
            }
            else (answer.selections === "update an employee role") {
                updateEmployeeRole();
            }
        })
}

function viewDepartment() {

}

function viewRole() {

}

function viewEmployees() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployeeRole() {

}