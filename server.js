const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
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
            
        };
        if(response.main_menu === "Quit") {
            
        };
    })
}
function viewEmployees(){

}


function viewRoles(){

}

function viewDept(){
    
}
mainMenu();