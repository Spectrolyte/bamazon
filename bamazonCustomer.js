var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bamazon_db'
});

// store user input here
var searchQuery = 'Mouse';

connection.query('SELECT * FROM `products` WHERE `product_name` = ?', searchQuery, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    if (error) {
        console.log(error);
        return;
    }

    // results will contain the results of the query
        // results from bamazon query is an object nested in an array with the column names as properties
    console.log('Results: ' + JSON.stringify(results));

    // fields will contain information about the returned results fields (if any)
    // console.log('Fields: ' + JSON.stringify(fields));
  });
