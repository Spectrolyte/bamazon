DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT,
	product_name VARCHAR(50),
	department_name VARCHAR(50),
	price INTEGER,
	stock_quantity INTEGER,
	product_sales INTEGER DEFAULT 0,
	PRIMARY KEY (item_id)
);

DESCRIBE products;

INSERT INTO products
	(product_name, department_name, price, stock_quantity)
VALUES
	('Coffee Pods', 'Food', 20, 100),
	('Loose Leaf Tea', 'Food', 10, 100),
	('Face Masks', 'Beauty', 8, 200),
	('Yoga Mats', 'Fitness', 50, 65),
	('Mouse', 'Electronics', 75, 45),
	('Headset', 'Electronics', 150, 50),
	('Drone', 'Food', 500, 70),
	('Ceramic Mug', 'Household', 12, 120),
	('Knintendo Switch', 'Electronics', 400, 80),
	('Smario Odyssey', 'Games', 60, 85);
	
SELECT * FROM products;

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT,
	department_name VARCHAR(50),
	over_head_costs INT,
	PRIMARY KEY (department_id)
);

INSERT INTO departments
	(department_name, over_head_costs)
VALUES
	('Food', 800),
	('Beauty', 500),
	('Fitness', 750),
	('Electronics', 2000),
	('Household', 500),
	('Games', 1000);
	
SELECT * FROM departments;

SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(product_sales) AS product_sales, SUM(product_sales) - departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_name ORDER BY departments.department_id;

SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE'

