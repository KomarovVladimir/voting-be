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
    (1, "Room 3", "Pending"),
    (1, "Room 4", "Active"),
    (2, "Room 5", "Pending"),
    (2, "Room 6", "Active"),
    (3, "Room 7", "Completed");

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

INSERT INTO roomMember (room_id, user_id)
VALUES
	(5, 1),
    (6, 1),
    (7, 1);
    
    
INSERT INTO room (owner_id, name, status)
VALUES
	(3, "Room3213", "Pending");
    
INSERT INTO roomMember (room_id, user_id)
VALUES
	(15, 1);