CREATE TABLE shoes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(80),
	cost INTEGER
);

INSERT INTO shoes (name, cost)
VALUES ('nike', 99),
('vans', 30);

INSERT INTO shoes (name, cost)
VALUES ('space boots', 10);

SELECT * FROM shoes;