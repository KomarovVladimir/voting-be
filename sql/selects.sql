SELECT * FROM user;
SELECT * FROM room;
SELECT * FROM item;
SELECT * FROM vote;
SELECT * FROM room_member;

SELECT * FROM user WHERE email = "test@email.com";

-- Ger rooms data
SELECT DISTINCT r.id, r.name, concat(first_name, " ", last_name) as authorName, r.owner_id = 6 AS isOwner
FROM room AS r
LEFT JOIN user AS u ON r.owner_id = u.id
LEFT JOIN room_member AS rm ON rm.room_id = r.id
WHERE u.id = 6 OR rm.user_id = 6;

-- Items and votes
SELECT item.id, item.name, COUNT(vote.user_id) votes
FROM item
LEFT JOIN vote
ON item.id = vote.item_id AND item.room_id = vote.room_id
WHERE item.room_id = 2
GROUP BY item.id;

-- Items and votes + boolean user id
SELECT item.id, item.name, COUNT(vote.user_id) votes, CASE WHEN vote.user_id = 1 THEN 1 ELSE 0 END voted
FROM item
LEFT JOIN vote
ON item.id = vote.item_id AND item.room_id = vote.room_id
WHERE item.room_id = 2
GROUP BY item.id, voted;

-- v2
SELECT item.id, item.name, COUNT(vote.user_id) votes, SUM(vote.user_id = 1) AS voted
FROM item
LEFT JOIN vote
ON item.id = vote.item_id AND item.room_id = vote.room_id
WHERE item.room_id = 2
GROUP BY item.id;

-- Messages
SELECT id, user_id userId, created, last_updated lastUpdated, text
FROM message;

-- Messages with usernames
SELECT m.id, text, m.created, m.last_updated lastUpdated, user_id userId, CONCAT(u.first_name, " ", u.last_name) username
FROM message AS m
LEFT JOIN user AS u
ON m.user_id = u.id;

-- Get room members
-- TODO: ADD IS ONLINE FIELD
SELECT u.id, CONCAT(first_name, " ", last_name) username, email
FROM room_member AS rm
LEFT JOIN user AS u
ON rm.user_id = u.id;

SELECT u.id, CONCAT(first_name, " ", last_name) username, email
FROM room_member AS rm
LEFT JOIN user AS u
ON rm.user_id = u.id
WHERE rm.room_id = 2;