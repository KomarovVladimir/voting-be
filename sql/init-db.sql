USE voting;

DROP DATABASE IF EXISTS voting;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS roomUser;

#============================== db ==============================
CREATE DATABASE voting;

#============================== user ==============================
CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(35),
	password VARCHAR(255),
    first_name VARCHAR(35),
	last_name VARCHAR(35),
    created TIMESTAMP,
	last_updated TIMESTAMP,
	PRIMARY KEY (id)
);

#============================== room ==============================
CREATE TABLE room (
	id INT NOT NULL AUTO_INCREMENT,
    owner_id INT NOT NULL,
    name VARCHAR(255),
	status ENUM("Pending", "Active", "Completed"),
	created TIMESTAMP,
	last_updated TIMESTAMP,
	PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES user(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

#============================== item ==============================
CREATE TABLE item (
	id INT NOT NULL AUTO_INCREMENT,
    room_id INT NOT NULL,
	votes INT,
    name VARCHAR(255),
	PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES room(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

#============================== message ==============================
CREATE TABLE message (
	id INT NOT NULL AUTO_INCREMENT,
    room_id INT NOT NULL,
	user_id INT NOT NULL,
    created TIMESTAMP,
	last_updated TIMESTAMP,
    text TEXT,
    name VARCHAR(255),
	PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES room(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (user_id) REFERENCES user(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

#============================== room-user ==============================
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

#============================== inserts ==============================
INSERT INTO user (email, password, first_name, last_name)
VALUES
	("test@email.com", "testpassword123123", "Name 1", "Surname 1"),
	("test2@email.com", "testpassword123123", "Name 2", "Surname 2"),
	("test3@email.com", "testpassword123123", "Name 3", "Surname 3");

INSERT INTO room (owner_id, name, status)
VALUES
	(1, "Room 1", "Pending"),
    (1, "Room 2", "Active"),
    (2, "Room 3", "Completed");

INSERT INTO item (name, room_id, votes)
VALUES
	("Item 1", 2, 12),
    ("Item 2", 2, 5),
    ("Item 3", 2, 54);

INSERT INTO message (room_id, user_id, text)
VALUES
	(2, 1, "A message 1"),
    (2, 2, "A message 2"),
    (2, 3, "A message 3");

INSERT INTO roomUser (room_id, user_id)
VALUES
	(2, 1),
    (2, 2);

#============================== selects ==============================
SELECT * FROM user;

SELECT * FROM room;

SELECT * FROM item;

SELECT * FROM message;

SELECT * FROM roomUser;

SELECT * FROM user INNER JOIN roomUser
WHERE user.id = roomUser.user_id;