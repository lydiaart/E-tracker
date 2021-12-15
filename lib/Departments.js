const { printTable } = require('console-table-printer');
const {viewAllDepartmentString, viewSalaryDepartment, insertDepartmentString, deleteDepartmentString}=require("./DepartmentsQuery")
const inquirer = require('inquirer');
const department = {
    viewAllDepartments: async(query,menu)=> {
       const data = await query(viewAllDepartmentString);
   
       printTable(data);
       menu();
   },
   viewSalaryDepartment: async(query,menu)=> {
    const data = await query(viewSalaryDepartment);

    printTable(data);
    menu();
},
   addDepartment: async(query,menu)=> {

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
   
       const data = await query(insertDepartmentString, [answer.addDepartment]);
       await console.log("You have successfully added the new department!");
       await department.viewAllDepartments(query,menu);
   
   },
   removeDepartment:async(query,menu)=> {
       const data = await query(viewAllDepartmentString)
       const departments = data.map(department => {
           return {
               name: department.name,
               value: department.id
           }
       })
       const answer = await inquirer.prompt([
           {
               type: "list",
               name: "department_id",
               message: "Which department would you like to remove.? (Required)",
               choices: departments,
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
   
       await query(deleteDepartmentString, [answer.department_id]);
       await console.log("You have successfully removed the new department!");
       await department.viewAllDepartments(query,menu);
   
   }
   

}

module.exports = department;