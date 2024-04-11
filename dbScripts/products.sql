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
CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name TEXT,
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

-- Users
SELECT * FROM users;
DROP TABLE users;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	email TEXT,
	password TEXT
)

INSERT INTO users(name, email, password) OUTPUT Inserted.name, Inserted.email, Inserted.password VALUES ('test1', 'test1@gmail.com', 'test1');
UPDATE users SET refreshToken='135' WHERE email = 'test1@gmail.com'


INSERT INTO categoriesandproducts VALUES (1,10), (2,10), (3,10)
INSERT INTO categoriesandproducts VALUES (1,9), (2,8), (3,7)

SELECT * FROM categoriesandproducts
JOIN categories ON categories.id = categoriesandproducts.category_id
JOIN products ON products.id = categoriesandproducts.product_id)
WHERE category_name = 'Playstation 5' OR category_name = 'Akció/Kaland' OR category_name = 'Sport'
 

