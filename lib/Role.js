const { printTable } = require('console-table-printer');
const { viewRoleString, addRoleString, removeRoleString } = require("./RoleQuery")
const inquirer = require('inquirer');
const role = {
    viewRole: async(query,menu)=> {
        const data = await query(viewRoleString);
    
        printTable(data);
        menu();
    },
    
    addRole:async(query,menu)=> {
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
    
        const data = await query(addRoleString, [answer.title, answer.salary, answer.department_id]);
        await console.log("You have successfully added the new title, salary and department_id!");
        await role.viewRole(query,menu);
    },
    
    removeRole: async(query,menu)=> {
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "role_id",
                message: "Choose the following role below to remove: (Required)",
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
                        console.log("Please choose the role that you would like to remove!");
                        return false;
                    }
                }
            },
        ])
    
        await query(removeRoleString, [answer.role_id]);
        await console.log("You have successfully removed the employee!");
        await role.viewRole(query,menu);
    }
}



module.exports = role;