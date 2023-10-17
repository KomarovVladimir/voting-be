SELECT * FROM user;

SELECT * FROM room;

SELECT * FROM item;

SELECT * FROM message;

SELECT * FROM roomMember;

SELECT room.id roomId, room.owner_id, user.id user_id, room.name
FROM room 
INNER JOIN user ON room.owner_id = user.id
WHERE user.id = 1;

SELECT room.id roomId, room.owner_id, user.id user_id, room.name
FROM room 
INNER JOIN roomMember ON room.id = roomMember.room_id
INNER JOIN user ON roomMember.user_id = user.id
WHERE user.id = 1;

SELECT room.id room_id, room.owner_id, roomMember.user_id, concat(first_name, " ", last_name) as authorName
FROM room 
LEFT JOIN user ON room.owner_id = user.id
LEFT JOIN roomMember ON roomMember.room_id = room.id
WHERE user.id = 1 OR roomMember.user_id = 1;

