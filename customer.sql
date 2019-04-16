DROP DATABASE IF EXISTS bamazon_DB

CREATE DATABASE bamazon_DB

USE bamazon_DB

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name varchar(45),
department_name(45),
price DECIMAL(10,2),
stock_quantiy INTEGER(1000),
PRIMARY KEY (item_id)

)

INSERT INTO products(product_name ,
department_name,
price ,
stock_quantiy
)
values ("galaxy-10", "electronics",899.99, 50)

INSERT INTO products(product_name ,
department_name,
price ,
stock_quantiy )
values ("galaxy-buds", "electronics",199.99, 50)

INSERT INTO products(product_name ,
department_name,
price ,
stock_quantiy )
values ("wireless-charger", "electronics",29.99, 25)

INSERT INTO products(product_name ,
department_name,
price ,
stock_quantiy )
values ("air-compressor", "hardware",149.99, 15)

INSERT INTO products(product_name ,
department_name,
price ,
stock_quantiy )
values ("airbrush", "art_supplies",299.99, 36)

INSERT INTO products(product_name ,
department_name,
price ,
stock_quantiy )
values ("lenovo-ideapad", "electronics",699.99, 50)

INSERT INTO products(product_name ,
department_name,
price ,
stock_quantiy )
values ("The Richest Man In Babylon", "books",10.99, 500)

INSERT INTO products(product_name ,
department_name,
price ,
stock_quantiy )
values ("Rich Dad Poor Dad", "books",8.99, 450)

INSERT INTO products(product_name ,
department_name,
price ,
stock_quantiy )
values ("wireless-mouse", "electronics",19.99, 50)

INSERT INTO products(product_name ,
department_name,
price ,
stock_quantiy )
values ("Samung-50inch-tv", "electronics",599.99, 100)

