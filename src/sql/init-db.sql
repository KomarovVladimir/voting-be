CREATE DATABASE voting;

CREATE TABLE user (
	user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(35),
	last_name VARCHAR(35),
    password VARCHAR(30),
    creation_date TIMESTAMP,
	last_access_date TIMESTAMP,
	updated_at TIMESTAMP,
	PRIMARY KEY (user_id)
);


INSERT INTO user (first_name, last_name, password)
VALUES ("Name", "Surname", "123123");