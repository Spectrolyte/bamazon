var inquirer = require('inquirer');
require('console.table');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bamazon_db'
  });

function showSupOps () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Product Sales by Department', 'Create New Department', 'Nothing'],
            name: 'supOp'
        }
    ]).then(function (data) {
        if (data.supOp === 'View Product Sales by Department') {
            connection.query('SET SESSION sql_mode = "STRICT_TRANS_TABLES,NO_ZERO_IN_DATE"', function (error, results) {
                showSales();
            })
        }
        else if (data.supOp === 'Create New Department') {
            newDept();
        }
        else {
            console.log('Okay. See you next time!')
        }
    })
}

function showSales () {
    var query = 'SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(product_sales) AS product_sales, SUM(product_sales) - departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_name ORDER BY departments.department_id';
    connection.query(query, function (error, results) {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Product Sales by Department:')
        console.table(results);
        showSupOps();
    })
}

function newDept () {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What\'s the name of the new department?',
            name: 'newDept'
        },
        {
            type: 'input',
            message: 'What\'s the overhead cost of the new department?',
            name: 'overHeadCost',
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (data) {
        var query = 'INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)';
        connection.query(query, [data.newDept, data.overHeadCost], function (error, results) {
            console.log('You added ' + data.newDept + ' as a new department.');
            showSupOps();
        })
    })
}

showSupOps();