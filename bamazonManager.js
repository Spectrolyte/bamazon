var inquirer = require('inquirer');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bamazon_db'
});

function showManagerOps () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory','Add New Product'],
            name: 'managerOp'
        }
    ]).then(function (data) {
        if (data.managerOp === 'View Products for Sale') {
            // list every available item: the item IDs, names, prices, and quantities
            showInventory();
        }
        else if (data.managerOp === 'View Low Inventory') {
            // list all items with an inventory count lower than five.
            lowInventory();
        }
        else if (data.managerOp === 'Add to Inventory') {
            // display a prompt that will let the manager "add more" of any item currently in the store
            increaseStock();
        }
        else if (data.managerOp === 'Add New Product') {
            console.log(data.managerOp);
            
        }
    })
}

showManagerOps();

function showInventory () {
    connection.query('SELECT * FROM `products`', function (error, results) {
        // if there's an error, print and return
        if (error) {
            console.log(error);
            return;
        }
    
        console.log('\nList of inventory items: \n');
        for (var i=0; i < results.length; i++) {
            console.log('Product ID: ' + results[i].item_id);
            console.log('Product Name: ' + results[i].product_name);
            console.log('Price: $' + results[i].price);
            console.log('Stock Quantity: ' + results[i].stock_quantity);
            console.log('--------------------------------------');
        }

        showManagerOps();
      });
}

function lowInventory () {
    connection.query('SELECT * FROM `products`', function (error, results) {
        // if there's an error, print and return
        if (error) {
            console.log(error);
            return;
        }
    
        console.log('\nList of inventory items low in stock: \n');
        for (var i=0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                console.log('Product ID: ' + results[i].item_id);
                console.log('Product Name: ' + results[i].product_name);
                console.log('Price: $' + results[i].price);
                console.log('Stock Quantity: ' + results[i].stock_quantity);
                console.log('--------------------------------------');
            }
        }

        showManagerOps();
      });
}

function increaseStock () {

    connection.query('SELECT * FROM `products`', function (error, results) { 
        if (error) {
            console.log(error);
            return;
        }

        var productNames = [];

        for (var i=0; i < results.length; i++) {
            productNames.push(results[i].product_name);
        }

        inquirer.prompt([
            {
                type: 'list',
                message: 'Which item would you like to replenish?',
                choices: productNames,
                name: 'addMore'
            }
        ]).then(function (data) {
            var product = data.addMore;

            inquirer.prompt([
                {
                    type: 'input',
                    message: 'How many units of ' + product + ' would you like to add to stock?',
                    validate: function (value) {
                        return isNaN(value) === false && parseInt(value) > 0
                    },
                    name: 'stockIncrease'
                }
            ]).then(function (data) {
                var stockIncrease = parseInt(data.stockIncrease);
                var currentStock;

                connection.query('SELECT * FROM `products` WHERE ?', [{product_name: product}], function (error, results) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    currentStock = results[0].stock_quantity;
                    console.log(currentStock);
                })

                //     connection.query('UPDATE `products` SET stock_quantity = ? + stockIncrease WHERE product_name = ?', [])
                // })
    
        })
    })
})
}
