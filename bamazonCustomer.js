var inquirer = require('inquirer');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bamazon_db'
});

// stores the products with their ids, prices, and stock
var bamazonProducts;

connection.query('SELECT * FROM `products`', function (error, results) {
    // if there's an error, print and return
    if (error) {
        console.log(error);
        return;
    }
    // first display all of the items available for sale. Include the ids, names, and prices of products for sale
        // results from bamazon query is an object, with column names as properties, nested in an array
        // iterate through array and print each of the objects' properties

    bamazonProducts = results;

    console.log('\nWelcome to Bamazon! These are the items we currently have in stock: \n');
    for (var i=0; i < results.length; i++) {
        console.log('Product ID: ' + results[i].item_id);
        console.log('Product Name: ' + results[i].product_name);
        console.log('Price: $' + results[i].price);
        console.log('--------------------------------------');
    }
    placeOrder();
});

// User prompts:
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function placeOrder () {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What\'s the Product ID of the item you would like to purchase?',
            validate: function (value) {
                return isNaN(value) === false && parseInt(value) > 0
            },
            name: 'product_id'
        }
    ]).then(function (data) {
        var productId = data.product_id;
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
            var units = data.units;
            // Once the customer has placed the order,
            // your application should check if your store has enough of the product to meet the customer's request.
            checkStock(productId, units);
        })
    })
}

// checks if bamazon stock has enough units for user to purchase
function checkStock (id, order) {
    // console.log(JSON.stringify(bamazonProducts));

    var productId = id;
    var unitsOrdered = order;
    var productName;
    var unitsLeft;
    var price;
    var total;

    // If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
    // However, if your store does have enough of the product, you should fulfill the customer's order.

    // This means updating the SQL database to reflect the remaining quantity.
    // Once the update goes through, show the customer the total cost of their purchase.

    // find product data based on its id
    for (var i=0; i < bamazonProducts.length; i++) {
        if (bamazonProducts[i].item_id === parseInt(id)) {

            productName = bamazonProducts[i].product_name;
            unitsLeft = bamazonProducts[i].stock_quantity;
            price = bamazonProducts[i].price;
            total = parseInt(order) * price;


            if (unitsLeft > parseInt(order)) {
                console.log('update bamazon database');
                // subtract the units ordered from the stock quantity and update product sales with total
                updateStock(productId, unitsOrdered, unitsLeft, total);

                // display order and total
                console.log('You ordered ' + order + ' of ' + productName + '. Your total is $' + total + '.');
            }
            else {
                console.log('Insufficient quantity!');
            }
        }
    }
}

function updateStock (id, order, remaining, sale) {
    var unitsLeft = parseInt(remaining);
    var unitsOrdered = parseInt(order);
    var newSale = sale;
    // subtract the units ordered from the stock quantity
    var newStock = unitsLeft - unitsOrdered;

    connection.query('SELECT * FROM `products` WHERE `item_id` = ?', [id], function (error, results) {

        var currentSales = results[0].product_sales;

        connection.query('UPDATE `products` SET `stock_quantity` = ?, `product_sales` = ? + ' + newSale + ' WHERE `item_id` = ?', [newStock, currentSales, id], function (error, results) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('Order successfully placed!');
        });
    })
}