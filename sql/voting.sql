USE voting;

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
	PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES room(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (user_id) REFERENCES user(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

#============================== room-user ==============================
CREATE TABLE room_member (
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

#============================== room-user ==============================
CREATE TABLE vote (
	room_id INT NOT NULL,
    item_id INT NOT NULL,
	user_id INT NOT NULL,
    PRIMARY KEY (room_id, user_id),
    FOREIGN KEY (room_id) REFERENCES room(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (item_id) REFERENCES item(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (user_id) REFERENCES user(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);