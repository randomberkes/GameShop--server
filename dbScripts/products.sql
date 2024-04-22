-- migration manager
CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name TEXT,
	platform TEXT,
	game_device_compatibility TEXT,
	game_type TEXT,
	rating_pegi TEXT,
	number_of_players TEXT,
	description TEXT,
	price TEXT
)

CREATE TABLE categoryTypes (
	id SERIAL PRIMARY KEY,
	category_type_name TEXT,
)
CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	category_name TEXT,
	category_type_id INTEGER REFERENCES categoryTypes(id)
)

CREATE TABLE categoriesAndProducts (
	product_id INTEGER REFERENCES products(id)
	category_id INTEGER REFERENCES categories(id)
	PRIMARY KEY (product_id, category_id)
)

INSERT INTO categories (category_name, category_type_id)
VALUES ('PlayStation', 6), ('Egy Több', 4), ('Egy', 4), ('16+', 3), ('18+', 3), ('3+', 3), ('Kaland', 2), ('Sport', 2), ('Akció/Kaland', 2), ('Playstation 5', 1);

INSERT INTO categoryTypes (category_type_name)
VALUES ('Platform')
-- VALUES ('Játékeszköz kompatibilitás'), ('Játék típusa'),( 'Rating PEGI (ajánlott korosztály)'), ('Játékosok száma');

INSERT INTO products (name, platform, game_device_compatibility, game_type, rating_pegi, number_of_players, description, price)
VALUES ('Marvels Spider-Man 2 játékszoftver, 
		PlayStation 5', 'PlayStation', 
		'Playstation 5', 'Akció/Kaland', '16+',
	   'Egy','description', '25.890')
	   
INSERT INTO products (name, platform, game_device_compatibility, game_type, rating_pegi, number_of_players, description, price)
VALUES ('EA Sports FC 24 PS5', 'PlayStation', 
		'Playstation 5', 'Sport', '3+',
	   'Egy Több','description', '9.190')
	   
INSERT INTO products (name, platform, game_device_compatibility, game_type, rating_pegi, number_of_players, description, price)
VALUES ('God of War Ragnarök, PlayStation 5', 'PlayStation', 
		'Playstation 5', 'Kaland', '18',
	   'Egy','description', '22.190')
	   
	   
	   
SELECT * FROM products;

SELECT * FROM categorytypes;

SELECT * FROM categories;

SELECT * FROM categoriesandproducts;

--Products

SELECT * FROM products;

SELECT * FROM products WHERE id = 1;

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name TEXT,
	description TEXT,
	price TEXT
)

-- Users
SELECT * FROM users;
SELECT * FROM users WHERE id = 14
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFuZG9tIiwiaWF0IjoxNzEzNzAxNzU0LCJleHAiOjE3MTM3MDM1NTR9.49TUY7vZyuDcQRK9n1VskV0WkOd3Z7AE2_lJhNVZqOE
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFuZG9tIiwiaWF0IjoxNzEzNzAxNzU0LCJleHAiOjE3MTM3MDM1NTR9.49TUY7vZyuDcQRK9n1VskV0WkOd3Z7AE2_lJhNVZqOE
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFuZG9tIiwiaWF0IjoxNzEzNzAxNzU0LCJleHAiOjE3MTM3MDM1NTR9.49TUY7vZyuDcQRK9n1VskV0WkOd3Z7AE2_lJhNVZqOE
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFuZG9tIiwiaWF0IjoxNzEzNzAxNzU0LCJleHAiOjE3MTM3MDM1NTR9.49TUY7vZyuDcQRK9n1VskV0WkOd3Z7AE2_lJhNVZqOE

UPDATE users SET name = 'randi' email = 'randomberkes@gmail.com'  password = '$2b$10$XW/ETh2DRDPKkkJsEl1v6OjTZrl6cJ3ReVZNOzLhR09VV3mg6wq1W' WHERE id = 14;
DROP TABLE users;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	email TEXT,
	password TEXT,
	refreshToken TEXT
)

UPDATE users
SET name = 'randi'
WHERE id=14;

INSERT INTO users(name, email, password)  VALUES ('test1', 'test1@gmail.com', 'test1');
UPDATE users SET refreshToken='135' WHERE email = 'test1@gmail.com'


INSERT INTO categoriesandproducts VALUES (1,10), (2,10), (3,10)
INSERT INTO categoriesandproducts VALUES (1,9), (2,8), (3,7)

SELECT * FROM categoriesandproducts
JOIN categories ON categories.id = categoriesandproducts.category_id
JOIN products ON products.id = categoriesandproducts.product_id)
WHERE category_name = 'Playstation 5' OR category_name = 'Akció/Kaland' OR category_name = 'Sport'

--favorites
SELECT * FROM favorites;

CREATE TABLE favorites (
	product_id INTEGER REFERENCES products(id),
	user_id INTEGER REFERENCES users(id),
	PRIMARY KEY (product_id, user_id)
)

INSERT INTO favorites VALUES (3, 14);

DELETE FROM favorites WHERE product_id = 3 AND user_id = 14;

SELECT products.* FROM favorites
JOIN users ON users.id = favorites.user_id
JOIN products ON products.id = favorites.product_id
WHERE user_id = 14;

--cart
SELECT * FROM cart;

CREATE TABLE cart (
	product_id INTEGER REFERENCES products(id),
	user_id INTEGER REFERENCES users(id),
	PRIMARY KEY (product_id, user_id)
)
DELETE FROM cart WHERE user_id = 14;

--order

SELECT id FROM orders WHERE user_id = 14;
SELECT * FROM order_items

SELECT orders.id, products.name, order_items.amount,  products.img_path, products.price  FROM orders
JOIN users ON users.id = orders.user_id
JOIN order_items ON orders.id = order_items.order_id
JOIN products ON products.id = order_items.product_id

WHERE orders.id = 21; 

--activation key
SELECT * FROM activation_keys;

SELECT * FROM activation_keys WHERE product_id = 1;
SELECT COUNT(*) FROM activation_keys WHERE user_id = 16 AND product_id = 2;
SELECT * FROM activation_keys WHERE product_id = 1;

SELECT  DISTINCT users.name, activation_keys.price FROM activation_keys
JOIN users ON users.id = activation_keys.user_id WHERE activation_keys.product_id = 2;

DROP TABLE activation_keys;

CREATE TABLE activation_keys (
	id SERIAL PRIMARY KEY,
	product_id INTEGER REFERENCES products(id),
	user_id INTEGER REFERENCES users(id),
	price NUMERIC,
	activation_key TEXT UNIQUE
)

INSERT INTO activation_keys (product_id, user_id, price, activation_key) VALUES (1, 16, 12000, '8228-9312-4655-2895');
INSERT INTO activation_keys (product_id, user_id, price, activation_key) VALUES (1, 16, 12000, '7117-9361-9542-0662');

INSERT INTO activation_keys (product_id, user_id, price, activation_key) VALUES (2, 15, 14000,'5238-9451-4733-4853');
INSERT INTO activation_keys (product_id, user_id, price, activation_key) VALUES (2, 16, 15000,'9659-1825-8010-2537');
INSERT INTO activation_keys (product_id, user_id, price, activation_key) VALUES (2, 16, 15000,'9159-0872-1757-3467');

INSERT INTO activation_keys  (product_id, user_id, price, activation_key)VALUES (3, 14, 17000,'4997-3139-4949-1088');
 

