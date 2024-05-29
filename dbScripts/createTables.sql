CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	email TEXT,
	password TEXT,
	refreshToken TEXT
)

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name TEXT,
	platform TEXT,
	game_device_compatibility TEXT,
	game_type TEXT,
	rating_pegi TEXT,
	number_of_players TEXT,
	description TEXT,
	img_path TEXT
)

CREATE TABLE owners (
	id SERIAL PRIMARY KEY,
	product_id  INTEGER REFERENCES products(id),
	user_id INTEGER REFERENCES users(id),
	UNIQUE (product_id, user_id)
)
CREATE TABLE offers (
	id SERIAL PRIMARY KEY,
	product_id  INTEGER REFERENCES products(id),
	user_id INTEGER REFERENCES users(id),
	price NUMERIC,
	UNIQUE (product_id, user_id)
)
CREATE TABLE favorites (
	user_id INTEGER REFERENCES users(id),
	offer_id INTEGER REFERENCES offers(id),
	PRIMARY KEY (offer_id, user_id)
)
CREATE TABLE cart (
	user_id INTEGER REFERENCES users(id),
	offer_id INTEGER REFERENCES offers(id),
	amount INTEGER,
	PRIMARY KEY (offer_id, user_id)
)
CREATE TABLE activation_keys (
	id SERIAL PRIMARY KEY,
	offer_id INTEGER REFERENCES offers(id),
	owner_id INTEGER REFERENCES owners(id),
	activation_key TEXT UNIQUE
)
CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	price NUMERIC,
	user_id INTEGER REFERENCES users(id),
)
CREATE TABLE order_items (
	order_id  INTEGER REFERENCES orders(id),
	offer_id INTEGER REFERENCES offers(id),
	amount INTEGER,
	PRIMARY KEY(order_id, offer_id)
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



INSERT INTO categoryTypes (category_type_name)
VALUES ('Játékeszköz kompatibilitás'), ('Játék típusa'),( 'Rating PEGI (ajánlott korosztály)'), ('Játékosok száma');

INSERT INTO categories (category_name, category_type_id)
VALUES ('Egy Több', 4), ('Egy', 4), ('16+', 3), ('18+', 3), ('3+', 3), ('Kaland', 2), ('Sport', 2), ('Racing', 2),('Akció/Kaland', 2), ('Playstation 5', 1);

INSERT INTO products (name, platform, game_device_compatibility, game_type, rating_pegi, number_of_players, description, img_path)
VALUES ('Marvels Spider-Man 2 játékszoftver, 
		PlayStation 5', 'PlayStation', 
		'Playstation 5', 'Akció/Kaland', '16+',
	   'Egy','description', '/images/SpiderMan2PS5BoxArt.jpeg');
	   
INSERT INTO products (name, platform, game_device_compatibility, game_type, rating_pegi, number_of_players, description, img_path)
VALUES ('EA Sports FC 24 PS5', 'PlayStation', 
		'Playstation 5', 'Sport', '3+',
	   'Egy Több','description', '/images/fifa-24-standard-edition-cover-fc-24.webp');
	   
INSERT INTO products (name, platform, game_device_compatibility, game_type, rating_pegi, number_of_players, description, img_path)
VALUES ('God of War Ragnarök, PlayStation 5', 'PlayStation', 
		'Playstation 5', 'Kaland', '18+',
	   'Egy','description', '/images/4xJ8XB3bi888QTLZYdl7Oi0s.webp');
	   INSERT INTO products (name, platform, game_device_compatibility, game_type, rating_pegi, number_of_players, description, img_path)
VALUES ('EA Sports FC 24 Xbox One', ' Xbox', 
		'Xbox One Xbox Series X', 'Sport', '3+',
	   'Egy Több','Örömmel üdvözöl az EA SPORTS FC™ 24! Ez itt a világ kedvenc játéka: a legélethűbb futballélmény a HyperMotionV* technológiával, az Opta által optimalizált PlayStyles játékstílusokkal és a továbbfejlesztett Frostbite™ játékmotorral, amellyel újragondoljuk, hogyan mozog és játszik több mint 19 000 autentikus játékos minden meccsen.',
	   '/images/fifa-24-standard-edition-cover-fc-24.webp');
	   
	   
INSERT INTO products (name, platform, game_device_compatibility, game_type, rating_pegi, number_of_players, description, img_path)
VALUES ('Forza Horizon 5, Xbox Series One/X', ' Xbox', 
		'Xbox One Xbox Series X', 'Racing', '3+',
	   'Egy Több','Minden idők Horizon-kalandja vár rád! Fedezd fel Mexikó életteli és folyamatosan változó, nyílt világú tájait a határtalan, szórakoztató vezetési akció során a világ legjobb autóinak százaival.',
	   '/images/FH5_Store21_R1_blog_Aug-2021.jpg');
	   
	   INSERT INTO products (name, platform, game_device_compatibility, game_type, rating_pegi, number_of_players, description, img_path)
VALUES ('Ghostwire Tokyo PC', 'PC', 
		'PC', 'Akció/Kaland', '16+',
	   'Egy','Ghostwire: Tokyo egy akció-kalandjáték, melyet a Tango Gameworks fejlesztett és a Bethesda Softworks adott ki. A játék a modern Tokyo-ban játszódik, ahol a város lakói hirtelen eltűnnek, és különös paranormális jelenségek veszik kezdetüket. A játékos egy misztikus erővel felruházott harcost irányít, aki képes szembeszállni az ok nélküli eltűnésekért felelős lényekkel.',
	   '/images/TxTazrLiLpvVD4MHDMkCOcRT.avif');
	   
SELECT * FROM products;

SELECT * FROM categorytypes;

SELECT * FROM categories;