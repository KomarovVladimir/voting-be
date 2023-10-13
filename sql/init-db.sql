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
VALUES
	("test@email.com", "testpassword123123", "Name 1", "Surname 1"),
	("test2@email.com", "testpassword123123", "Name 2", "Surname 2"),
	("test3@email.com", "testpassword123123", "Name 3", "Surname 3");

SELECT * FROM user;

#============================== room ==============================
DROP TABLE IF EXISTS room;

CREATE TABLE room (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
	status ENUM("Pending", "Active", "Completed"),
	PRIMARY KEY (id)
);

INSERT INTO room (name, status)
VALUES
	("Room 1", "Pending"),
    ("Room 2", "Active"),
    ("Room 3", "Completed");
    
SELECT * FROM room;

#============================== item ==============================
DROP TABLE IF EXISTS item;

CREATE TABLE item (
	id INT NOT NULL AUTO_INCREMENT,
    room_id INT NOT NULL,
	votes INT,
    name VARCHAR(30),
	PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES room(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO item (name, room_id, votes)
VALUES
	("Item 1", 2, 12),
    ("Item 2", 2, 5),
    ("Item 3", 2, 54);
    
SELECT * FROM item;

#============================== message ==============================
DROP TABLE IF EXISTS message;

CREATE TABLE message (
	id INT NOT NULL AUTO_INCREMENT,
    room_id INT NOT NULL,
	user_id INT NOT NULL,
    posting_date TIMESTAMP,
	updated_at TIMESTAMP,
    text TEXT,
    name VARCHAR(30),
	PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES room(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (user_id) REFERENCES user(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO message (room_id, user_id, text)
VALUES
	(2, 1, "A message 1"),
    (2, 2, "A message 2"),
    (2, 3, "A message 3");
    
SELECT * FROM message;

#============================== room-user ==============================
DROP TABLE IF EXISTS roomUser;

CREATE TABLE roomUser (
	room_id INT NOT NULL,
	user_id INT NOT NULL,
    PRIMARY KEY (room_id, user_id),
    FOREIGN KEY (room_id) REFERENCES room(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (user_id) REFERENCES user(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO roomUser (room_id, user_id)
VALUES
	(2, 1),
    (2, 2);

SELECT * FROM roomUser;

#============================== select users from the room ==============================
SELECT * FROM user INNER JOIN roomUser
WHERE user.id = roomUser.user_id;