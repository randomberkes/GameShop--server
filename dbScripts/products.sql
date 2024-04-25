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
DROP TABLE favorites;
SELECT * FROM favorites;

CREATE TABLE favorites (
	user_id INTEGER REFERENCES users(id),
	offer_id INTEGER REFERENCES offers(id),
	PRIMARY KEY (offer_id, user_id)
)

INSERT INTO favorites VALUES (3, 14);

DELETE FROM favorites WHERE product_id = 3 AND user_id = 14;

SELECT users.name as username, products.*, offers.price, offers.id as offerID FROM favorites
JOIN offers ON offers.id = favorites.offer_id
JOIN users ON users.id = offers.user_id
JOIN products ON products.id = offers.product_id
WHERE favorites.user_id = 14

--cart
DROP TABLE cart;
SELECT * FROM cart;
INSERT INTO cart VALUES (1, 16, '8228-9312-4655-2895');
CREATE TABLE cart (
	user_id INTEGER REFERENCES users(id),
	offer_id INTEGER REFERENCES offers(id),
	amount INTEGER,
	PRIMARY KEY (offer_id, user_id)
)
INSERT INTO cart VALUES (14, 1, 3);
INSERT INTO cart VALUES (14, 2, 1);
INSERT INTO cart VALUES (14, 3, 2);

INSERT INTO cart VALUES (16, 4, 2);


DELETE FROM cart WHERE user_id = 14 AND price_id = 2;

DELETE FROM cart WHERE user_id = 14;

UPDATE cart SET amount=amount+1  WHERE offer_id = 3 AND user_id = 14 RETURNING amount;

SELECT users.name, products.*, offers.price, offers.id as offerID, cart.amount  FROM cart
JOIN offers ON offers.id = cart.offer_id
JOIN users ON users.id = offers.user_id
JOIN products ON products.id = offers.product_id
WHERE cart.user_id = 14

--order

SELECT id FROM orders WHERE user_id = 14;
SELECT * FROM order_items WHERE order_id = 29
DROP TABLE order_items;

CREATE TABLE order_items (
	order_id  INTEGER REFERENCES orders(id),
	offer_id INTEGER REFERENCES offers(id),
	amount INTEGER,
	PRIMARY KEY(order_id, offer_id)
)

alter table order_items
drop constraint order_items_order_id_fkey,
add constraint order_items_order_id_fkey
   foreign key (order_id)
   references orders(id)
   on delete cascade;

SELECT orders.id, products.name, order_items.amount, orders.price  FROM orders
JOIN order_items ON orders.id = order_items.order_id
JOIN offers ON offers.id = order_items.offer_id 
JOIN products ON products.id = offers.product_id

WHERE orders.id = 28; 

--activation key
SELECT * FROM activation_keys;
DROP TABLE activation_keys;

SELECT * FROM activation_keys WHERE product_id = 1;
SELECT COUNT(*) FROM activation_keys WHERE user_id = 14 AND product_id = 2;
SELECT COUNT(*)  FROM offers JOIN activation_keys ON activation_keys.offer_id = offers.id WHERE offers.id = 4;
SELECT * FROM activation_keys WHERE product_id = 1;

SELECT orders.id, products.name, order_items.amount,  products.img_path, products.price  FROM orders
JOIN users ON users.id = orders.user_id

SELECT  DISTINCT users.name,prices.price FROM users
JOIN prices ON prices.user_id = users.id 
WHERE prices.product_id = 2;

DROP TABLE activation_keys;

CREATE TABLE activation_keys (
	id SERIAL PRIMARY KEY,
	offer_id INTEGER REFERENCES offers(id),
	owner_id INTEGER REFERENCES owners(id),
	activation_key TEXT UNIQUE
)

SELECT activation_keys.* FROM offers
JOIN activation_keys ON activation_keys.offer_id = offers.id
WHERE offers.id = 1;


INSERT INTO activation_keys (offer_id, activation_key) VALUES (2, '6301-6660-7969-2810');
INSERT INTO activation_keys (offer_id, activation_key) VALUES (2, '7735-3046-5926-4531');

INSERT INTO activation_keys (offer_id, activation_key) VALUES (3,'5926-0504-5077-6160');
INSERT INTO activation_keys (offer_id, activation_key) VALUES (1,'6677-4589-5791-6205');
INSERT INTO activation_keys (offer_id, activation_key) VALUES (1,'3384-9446-2064-9365');

INSERT INTO activation_keys  (offer_id, activation_key)VALUES (4,'8801-9761-8442-6430');






--offers
SELECT * FROM offers ;
DROP TABLE prices;
CREATE TABLE offers (
	id SERIAL PRIMARY KEY,
	product_id  INTEGER REFERENCES products(id),
	user_id INTEGER REFERENCES users(id),
	price NUMERIC,
	UNIQUE (product_id, user_id)
)
--getOffersFromDB
SELECT offers.id, offers.price, products.* FROM offers 
JOIN products ON offers.product_id = products.id 
WHERE offers.user_id = 14;

SELECT * FROM offers  WHERE user_id = 14;

SELECT activation_key FROM activation_keys WHERE offer_id = 3

INSERT INTO offers (product_id, user_id, price) VALUES (2, 16, 15000);
INSERT INTO offers (product_id, user_id, price) VALUES (1, 16, 12000);
INSERT INTO offers (product_id, user_id, price) VALUES (2, 15, 14000);
INSERT INTO offers (product_id, user_id, price) VALUES (3, 14, 17000);

UPDATE activation_keys SET offer_id=null, owner_id=1 WHERE offer_id=4, id=1; 

SELECT id from activation_keys WHERE offer_id=2; 

--own

SELECT id FROM owners WHERE user_id = 14;
SELECT * FROM owners
CREATE TABLE owners (
	id SERIAL PRIMARY KEY,
	product_id  INTEGER REFERENCES products(id),
	user_id INTEGER REFERENCES users(id),
	UNIQUE (product_id, user_id)
)

SELECT activation_keys.* FROM owners
JOIN activation_keys ON activation_keys.owner_id = owners.id
WHERE owners.user_id = 14;

INSERT INTO owners (product_id, user_id) VALUES (2, 14);

