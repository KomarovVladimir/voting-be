CREATE DATABASE voting;

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(35),
	password VARCHAR(30),
    first_name VARCHAR(35),
	last_name VARCHAR(35),
    creation_date TIMESTAMP,
	updated_at TIMESTAMP,
	PRIMARY KEY (id)
);

INSERT INTO user (email, password, first_name, last_name)
VALUES ("user@mail.com", "123123", "Name", "Surname");

SELECT * FROM user;