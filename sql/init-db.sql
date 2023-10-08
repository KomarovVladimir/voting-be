USE voting;

DROP DATABASE IF EXISTS voting;

CREATE DATABASE voting;

#============================== user==============================
DROP TABLE IF EXISTS user;

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
VALUES ("test@email.com", "testpassword123123", "Name", "Surname");

SELECT * FROM user;

#============================== room ==============================
DROP TABLE IF EXISTS room;

CREATE TABLE room (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
	status ENUM("pending", "active", "completed"),
	PRIMARY KEY (id)
);

INSERT INTO room (name, status)
VALUES
	("Room 1", "pending"),
    ("Room 2", "active"),
    ("Room 3", "completed");
    
SELECT * FROM room;

#============================== item ==============================
DROP TABLE IF EXISTS item;

CREATE TABLE item (
	id INT NOT NULL AUTO_INCREMENT,
    room_id INT NOT NULL,
    name VARCHAR(30),
	PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES room(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO item (name, room_id)
VALUES
	("Item 1", 1),
    ("Item 2", 1),
    ("Item 3", 1);
    
SELECT * FROM item;