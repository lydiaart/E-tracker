const query = require('./connection');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');
const figlet = require('figlet');
const { mapFinderOptions } = require('sequelize/dist/lib/utils');


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
        "add an employee",
        "remove an employee",
        "update employee's role",
        "update employee's department",
        "update employee's salary",
        "update employee's management", 
        "total salaries of all employees"
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
                viewAllDepartments();
            }
            else if (answer.selections === "add a department") {
                addDepartment();
            }
            else if (answer.selections === "remove a department") {
                removeDepartment();
            }
            else if (answer.selections === "view all roles") {
                viewRole();
            }
            else if (answer.selections === "add a role") {
                addRole();
            }
            else if (answer.selections === "remove a role") {
                removeRole();
            }
            else if (answer.selections === "view all employees") {
                viewEmployees();
            }
            else if (answer.selections === "add an employee") {
                addEmployee();
            }
            else if (answer.selections === "remove an employee") {
                removeRole();
            }
            else if (answer.selections === "update employee's role") {
                updateEmployeeRole();
            }
            else if (answer.selections === "update employee's salary") {
                updateEmployeeSalary();
            }
            else if (answer.selections === "update employee's management") {
                updateEmployeeManagment();
            }
            else {
                addAllSalaries();
            }
        })
}



async function viewAllDepartments() {
    const data = await query(" SELECT * FROM department");

    printTable(data);
    menu();
}

async function addDepartment() {

    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "addDepartment",
            message: "What's your desired new department name? (Required)",
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please add the name of the new department!");
                    return false;
                }
            }
        }
    ])

    const data = await query(" INSERT INTO department(name) VALUES(?)", [answer.addDepartment]);
    await console.log("You have successfully added the new department!");
    await viewAllDepartments();

}

async function removeDepartment() {

    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "removeDepartment",
            message: "Which department would you like to remove.? (Required)",
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please choose the department you'd like to remove!");
                    return false;
                }
            }
        }
    ])

    const data = await query(" DELETE FROM department(name) WHERE(?)", [answer.removeDepartment]);
    await console.log("You have successfully removed the new department!");
    await viewAllDepartments();

}

async function viewRole() {
    const data = await query(" SELECT * FROM role");

    printTable(data);
    menu();
}

async function addRole() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is this employee's title? (Required)",
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please enter the title for this employee!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "salary",
            message: "What's the salary for this employee? (Required)",
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please enter the salary for this employee!");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "department_id",
            message: "Please enter this employee's department. (Required)",
            choices: async () => {
                const data = await query(" SELECT * FROM department ")
                return data.map(department => {
                    return {
                        name: department.name,
                        value: department.id
                    }
                })
            },
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("You need to enter the department for this employee!");
                    return false;
                }
            }
        },
    ])

    const data = await query(" INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)", [answer.title, answer.salary, answer.department_id]);
    await console.log("You have successfully added the new title, salary and department_id!");
    await viewRole();
}

async function removeRole() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "department_id",
            message: "You may remove the employee by entering his/her department id. (Required)",
            choices: async () => {
                const data = await query(" DELETE FROM role WHERE ")
                return data.map(role => {
                    return {
                        name: role.name,
                        value: role.department_id
                    }
                })
            },
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please enter the department id!");
                    return false;
                }
            }
        },
    ])

    const data = await query(" DELETE FROM role(title, salary, department_id) VALUES(?, ?, ?)", [answer.title, answer.salary, answer.department_id]);
    await console.log("You have successfully removed the employee!");
    await viewRole();
}

async function viewEmployees() {
    const data = await query(" SELECT * FROM employee");

    printTable(data);
    menu();
}

async function addEmployee() {
    const employeeData = await query(" SELECT * FROM employee ")

    const newData = employeeData.map(manager => {
        return {
            name: manager.first_name + " " + manager.last_name + " ",
            value: manager.id
        }
    })


    newData.push({
        name: "None",
        id: null
    })

    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name? (Required)",
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("You need to add the first name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name? (Required)",
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("You need to add the last name!");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "role_id",
            message: "Please add the role title for the new employee. (Required)",
            choices: async () => {
                const data = await query(" SELECT * FROM role ")
                return data.map(role => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            },
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("You need to add the new role id!");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the manager for this employee? (Required)",
            choices: newData,
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("You need to add the new role id!");
                    return false;
                }
            }
        },
    ])

    const data = await query(" INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)", [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]);
    await console.log("You have successfully added the new employee's firstname, last name and role title!");
    await viewEmployees();
}

async removeEmployee()

async function updateEmployeeRole() {

    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "update",
            message: "Which employee would you like to change? (Required)",
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("You need to choose the employee!");
                    return false;
                }
            }
        },
    ])

}

async function removeEmployee() {

}