
const viewAllDepartmentString = `
SELECT * FROM department
`
const viewSalaryDepartment = `select  department.id,  name, sum(salary) salary
from   role  
left join department on role.department_id =department.id
group by name, department.id;
`
const insertDepartmentString = `INSERT INTO department(name) VALUES(?)
`
const deleteDepartmentString = `DELETE FROM department WHERE id=?
`




module.exports = {
    viewAllDepartmentString, viewSalaryDepartment,
    insertDepartmentString,
    deleteDepartmentString
};
