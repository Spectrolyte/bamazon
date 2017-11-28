DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT,
	product_name VARCHAR(50),
	department_name VARCHAR(50),
	price INTEGER,
	stock_quantity INTEGER,
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
	