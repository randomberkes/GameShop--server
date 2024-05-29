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