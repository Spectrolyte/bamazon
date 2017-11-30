var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bamazon_db'
  });

// View Product Sales by Department
// Create New Department

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Product Sales by Department', 'Create New Department'],
        name: 'supOp'
    }
]).then(function (data) {
    console.log(data.supOp);
})