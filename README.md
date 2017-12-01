# Bamazon

The purpose of Bamazon was to create a user interface that mimics online stores. Using Node.js, MySQL, and a few other dependencies, I was able to create unique interfaces for customers, managers, and supervisors that would provide the user feedback and update the Bamazon database according to the command that was chosen.

The demos for each of the interfaces have been linked below, along with a short description of how that interface works.

### Customer Interface
* Customers are asked if they would like to purchase an item
    * If they answer yes, they are then asked to specify the prouduct id number and how much of the item they would like to purchase.
        * Before the purchase goes through, the stock quantity is checked for sufficient quantity. If there isn't enough of the item, then the user is notified and returned to the initial prompt. Otherwise, the user is notified of the successful purchase and is shown the item they purchased, the amount they specified, and the total price.
    * If they answer no, the script ends and dismisses the user.
* Link to Customer demo: https://drive.google.com/open?id=1PJcXpvuUsEr0obiBrwFiZuWV8euv9l5x

### Manager Interface
* Managers have four main options to choose from:
    * View Product for Sale: displays the products currently for sale in inventory.
    * View Low Inventory: displays the products that have a stock quantity less than 5.
    * Add to Inventory: allows user to increase the stock quantity of an item that's currently in inventory.
    * Add New Product: allows user to add a completely new product to the inventory after specifying the name, department, price, and stock quantity.
    * Nothing: ends script and dismisses user.
* Link to Manager demo: https://drive.google.com/open?id=1g-gTC2KdvsZ322Mk9YSnCl3d9uXAQMlW

### Supervisor Interface
'View Product Sales by Department', 'Create New Department', 'Nothing
* Supervisors have two main options to choose from:
    * View Product Sales by Department: displays a table of each department, their over head costs, total product sales, and total profit. Total profit is dynamically created and calculated while the query is live.
    * Create New Department: allows user to create a new department after specifying the name and over head costs.
* Link to Supervisor demo: https://drive.google.com/open?id=1o7mGxcMLApOFE16hC_HRSpPoitMWsCJm

