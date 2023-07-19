const inquirer = require('inquirer');

const questions = [
    {
    type: "list",
    message: "What would you like to do?",
    choices: ["View all Employees", 
            "Add Employee", 
            "Update Employee Role", 
            "View All Roles", 
            "Add Role"],
    name: "main_menu" 
}
];

function mainMenu() {
    inquirer.prompt(questions)
    .then((response) => {
        console.log(response)
        viewDept();
    })
}
function viewDept(){
    
}
mainMenu();