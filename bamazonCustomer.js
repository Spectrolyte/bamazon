var inquirer = require('inquirer');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bamazon_db'
});

// store user input here
var searchQuery = 'Mouse';

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

connection.query('SELECT * FROM `products`', function (error, results) {
    // if there's an error, print and return
    if (error) {
        console.log(error);
        return;
    }
    // first display all of the items available for sale. Include the ids, names, and prices of products for sale
        // results from bamazon query is an object, with column names as properties, nested in an array
        // iterate through array and print each of the objects' properties
    // console.log('Results: ' + JSON.stringify(results));
    console.log('Welcome to Bamazon! These are the items we currently have in stock: \n');
    for (var i=0; i < results.length; i++) {
        console.log('Item ID: ' + results[i].item_id);
        console.log('Product Name: ' + results[i].product_name);
        console.log('Price: $' + results[i].price);
        console.log('--------------------------------------');
    }
    askUser();
  });

// User prompts:
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function askUser () {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What\'s the Item ID of the product you would like to purchase?',
            validate: function (value) {
                return isNaN(value) === false && parseInt(value) > 0
            },
            name: 'item_id'
        }
    ]).then(function (data) {
        var productId = data.item_id;
        inquirer.prompt([
            {
                type: 'input',
                message: 'How many units of this product would you like to buy?',
                validate: function (value) {
                    return isNaN(value) === false && parseInt(value) > 0
                },
                name: 'units'
            }
        ]).then(function (data) {
            console.log(data.units);
        })
    })
}

// Once the customer has placed the order,
// your application should check if your store has enough of the product to meet the customer's request.