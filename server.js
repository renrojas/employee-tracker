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
    choices: ['View all Employees', 
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

function mainMenu() {
    inquirer.prompt(mainQuestion)
    .then((response) => {
        console.log(response)
        if(response.main_menu === "View all Employees") {
            viewEmployees();
        };
        if(response.main_menu === "Add Employee") {
            app.post('/api/new-employee', ({ body }, res) => {
                const sql = `INSERT INTO employee (employee_name)
                  VALUES (?)`;
                const params = [response.main_menu];
                
                db.query(sql, params, (err, result) => {
                  if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                  }
                });
              });
        };
        if(response.main_menu === "Update Employee Role") {
            
        };
        if(response.main_menu === "View all Roles") {
            viewRoles();
        };
        if(response.main_menu === "Add Role") {
            
        };
        if(response.main_menu === "View All Departments") {
            viewDept();
        };
        if(response.main_menu === "Add Department") {
            addDept();
        };
        if(response.main_menu === "Quit") {
            
        };
    })
}
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

function addDept(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Name of department:',
            name: 'dept_name',
        }
    ])
    .then((response) => {
        console.log(response)


        
        mainMenu();
})
}

function viewRoles(){

}

function viewDept(){
    
}
mainMenu();