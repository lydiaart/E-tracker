const department = require('./lib/Departments');
const employee = require('./lib/Employees');
const role = require('./lib/Role');
const inquirer = require('inquirer');
const figlet = require('figlet');
const query = require('./connection');


const questions = {
    type: "list",
    name: "selections",
    message: "What would you like to do? (Required)",
    choices: [
        "view all departments",
        "add a department",
        "remove a department",
        "view all roles",
        "add a role",
        "remove a role",
        "view all employees",
        "view employees by manager",
        "view employees by department",
        "add an employee",
        "remove an employee",
        "update employee's role",
        "update employee's manager",
        "view total salary by deaprtment"
    ]
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
                department.viewAllDepartments(query,menu);
            }
            else if (answer.selections === "add a department") {
                department.addDepartment(query,menu);
            }
            else if (answer.selections === "remove a department") {
                department.removeDepartment(query,menu);
            }
            else if (answer.selections === "view all roles") {
                role.viewRole(query,menu);
            }
            else if (answer.selections === "add a role") {
                role.addRole(query,menu);
            }
            else if (answer.selections === "remove a role") {
                role.removeRole(query,menu);
            }
            else if (answer.selections === "view all employees") {
                employee.viewEmployees(query,menu);
            }
            else if (answer.selections === "view employees by manager") {
                employee.viewEmployeesByManager(query,menu);
            }
            else if (answer.selections === "view employees by department") {
                employee.viewEmployeesByDepartment(query,menu);
            }
            else if (answer.selections === "add an employee") {
                employee.addEmployee(query,menu);
            }
            else if (answer.selections === "remove an employee") {
                employee.removeEmployee(query,menu);
            }
            else if (answer.selections === "update employee's role") {
                employee.updateEmployeeRole(query,menu);
            }
            else if (answer.selections === "view total salary by deaprtment") {
                department.viewSalaryDepartment(query,menu);
            }
            else {
                employee.updateEmployeeManager(query,menu);
            }
         
        })
}
