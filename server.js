const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
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
}
//FUNCTION TO VIEW ALL EMPLOYEES
function viewEmployees(){
        const sql = `SELECT * FROM employee`;

        db.query(sql, (err, result) => {
            console.table(result)
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
        });
}

//FUNCTION TO ADD EMPLOYEES
// function addEmployee(){
//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'What is the employees first name?',
//             name: 'first_name'
//         },
//         {
//             type: 'input',
//             message: 'What is the employees last name?',
//             name: 'last_name'
//         },
//         {
//             type: 'list',
//             message: 'What is the employees role?',
//             choices: []
//         },
//         {
//             type: 'list',
//             message: 'Who is the employees manager?',
//             choices: []
//         }
//     ])
//     .then((response) => {
//         console.log(response)
//         const role_name = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?)'
    

//         db.query(sql, params, (err, response) => {
//             console.log(response)
//         });
//     })
// }



//FUNCTION TO UPDATE EMPLOYEE ROLE



//FUNCTION TO VIEW ALL ROLES
function viewRoles(){
    const sql = `SELECT * FROM role`;
    console.log("hello")
    db.query(sql, (err, result) => {
        console.table(result)
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
    });
}

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
            //console.log(departments)
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
        });
    })
}


//FUNCTION TO VIEW ALL DEPARTMENTS
function viewDept(){
    const sql = `SELECT * FROM department`;

        db.query(sql, (err, result) => {
            console.table(result)
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
    });
      });  
  mainMenu();
}


mainMenu();