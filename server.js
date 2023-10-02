const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );


const mainQuestion = [
    {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Employees', 
            'Add Employee', 
            'Update Employee Role', 
            'View All Roles', 
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'],
    name: "main_menu" 
}
];
//MAIN MENU
function mainMenu() {
    inquirer.prompt(mainQuestion)
    .then((response) => {
        console.log(response)
        if(response.main_menu === 'View All Employees') {
            viewEmployees();
        };
        if(response.main_menu === 'Add Employee') {
            addEmployee();
        };
        if(response.main_menu === 'Update Employee Role') {
            updateEmployee();
        };
        if(response.main_menu === 'View All Roles') {
            viewRoles();
        };
        if(response.main_menu === 'Add Role') {
            addRole();
        };
        if(response.main_menu === 'View All Departments') {
            viewDept();
        };
        if(response.main_menu === 'Add Department') {
            addDept();
        };
        if(response.main_menu === 'Quit') {
            
        };
    })
};
//FUNCTION TO VIEW ALL EMPLOYEES
function viewEmployees(){
        const sql = `SELECT * FROM employee`;

        db.query(sql, (err, result) => {
            console.table(result)
            mainMenu();
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
        })

};

//FUNCTION TO ADD EMPLOYEES
function addEmployee(){
    const sqlrole = `SELECT * FROM role`;
    const roles = [];
        db.query(sqlrole, (err, roleresult) => {
            for (let i = 0; i < roleresult.length; i++) {
                //console.log(result[i].role)
                roles.push({
                    name: roleresult[i].title,
                    value: roleresult[i].id
                })
            }
        });
    const sqlmanager = `SELECT * FROM employee`;
    const managers = [];
    db.query(sqlmanager, (err, managerResult) => {
        for (let i = 0; i < managerResult.length; i++) {
            managers.push({
                name: managerResult[i].first_name + " " + managerResult[i].last_name,
                value: managerResult[i].id
            })
        }
    });
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'last_name'
        },
        {
            type: 'list',
            message: 'What is the employees role?',
            choices: roles,
            name: 'role'
        },
        {
            type: 'list',
            message: 'Who is the employees manager?',
            choices: managers,
            name:'manager'
        }
    ])
    .then((response) => {
        console.log(response)
        const employee_name = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)'
        const params = [response.first_name, response.last_name, response.role, response.manager]

        db.query(employee_name, params, (err, response) => {
            console.log(response)
            mainMenu()
        });
    })
};



//FUNCTION TO UPDATE EMPLOYEE ROLE
function updateEmployee(){
    const sqlemployee = `SELECT * FROM employee`;
    const employees = [];
        db.query(sqlemployee, (err, result) => {
            for (let i = 0; i < result.length; i++) {
                employees.push({
                    name: result[i].first_name + " " + result[i].last_name,
                    value: result[i].id
                })
            }
        });
    const sqlrole = `SELECT * FROM role`;
    const roles = [];
        db.query(sqlrole, (err, roleresult) => {
            for (let i = 0; i < roleresult.length; i++) {
                roles.push({
                    name: roleresult[i].title,
                    value: roleresult[i].id
                })
            }
        });
    inquirer.prompt([
        {
            type: 'input',
            message: 'Do you want to update an employee?',
            name: 'question'
        },
        {
            type: 'list',
            message: 'Which employees role do you want to update?',
            choices: employees,
            name: 'employees'
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?',
            choices: roles,
            name: 'role'
        }
    ])
    .then((response) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [response.role, response.employees];
    console.log(response)

  db.query(sql, params, (err, result) => {
    console.log(result)
    mainMenu();
    })
    });
};


//FUNCTION TO VIEW ALL ROLES
function viewRoles(){
    const sql = `SELECT * FROM role`;
    console.log("hello")
    db.query(sql, (err, result) => {
        console.table(result)
        mainMenu();
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
    });
};

//FUNCTION TO ADD A ROLE
function addRole(){
    const sql = `SELECT * FROM department`;
    const departments = [];
        db.query(sql, (err, result) => {
            for (let i = 0; i < result.length; i++) {
                //console.log(result[i].department)
                departments.push({
                    name: result[i].department,
                    value: result[i].id
                })
            }
        })
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'role_name'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'role_salary'
        },
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            choices: departments,
            name: 'dept_name'
        }
    ])
    .then((response) => {
        console.log(response)
        const role_name = `INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`
        const params = [response.role_name, response.role_salary, response.dept_name]

        db.query(role_name, params, (err, response) => {
            console.log(response)
            mainMenu();
        });

    })

};


//FUNCTION TO VIEW ALL DEPARTMENTS
function viewDept(){
    const sql = `SELECT * FROM department`;

        db.query(sql, (err, result) => {
            console.table(result)
            mainMenu();
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
        });
}

//FUNCTION TO ADD DEPARTMENT
function addDept(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'dept_name',
        }
    ])
    .then((response) => {
        console.log(response)
        const sql = `INSERT INTO department (department)
        VALUES (?)`;
      const params = [response.dept_name];
      
      db.query(sql, params, (err, response) => {
        console.log(response)
        mainMenu();
    });
      });  
}


mainMenu();