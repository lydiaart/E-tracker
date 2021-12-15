const viewRoleString = `SELECT role.id, title, salary, 
name FROM role LEFT JOIN department ON 
role.department_id = department.id;
`
const addRoleString = `INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)
`
const removeRoleString = `DELETE FROM role WHERE id = ?`

module.exports = {
    viewRoleString,
    addRoleString,
    removeRoleString
}