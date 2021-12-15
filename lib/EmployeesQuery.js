const viewEmployeesString = `select employee.id,   employee.first_name, employee.last_name, title, salary,name department,  CONCAT(manager.first_name,' ',manager.last_name) manager from employee left join role on employee.role_id =role.id left join department on role.department_id =department.id left join employee manager on employee.manager_id =manager.id;
`
const viewEmployeesByManagerString = `select employee.id,   employee.first_name, employee.last_name, title, salary,name department,  CONCAT(manager.first_name,' ',manager.last_name) manager 
from employee 
left join role on 
employee.role_id =role.id 
left join department on 
role.department_id =department.id 
left join employee manager on 
employee.manager_id =manager.id where employee.manager_id=?;
`
const viewEmployeesByDepartmentString = `select employee.id,   employee.first_name, employee.last_name, title, salary,name department,  CONCAT(manager.first_name,' ',manager.last_name) manager 
from employee 
left join role on 
employee.role_id =role.id 
left join department on 
role.department_id =department.id 
left join employee manager on 
employee.manager_id =manager.id where role.department_id=?;
`
const addEmployeeString = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)
`
const removeEmployeeString = `DELETE FROM employee WHERE id = ? 
`
const updateEmployeeRoleString = `UPDATE employee SET role_id = ? WHERE id = ? 
`
const updateEmployeeManagerString = `UPDATE employee SET manager_id = ? WHERE id = ?
`



module.exports = {
    viewEmployeesString,
    viewEmployeesByManagerString,
    viewEmployeesByDepartmentString,
    addEmployeeString,
    removeEmployeeString,
    updateEmployeeRoleString,
    updateEmployeeManagerString
}