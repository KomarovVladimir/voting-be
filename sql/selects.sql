SELECT * FROM user;

SELECT * FROM room;

SELECT * FROM item;

SELECT * FROM vote;

SELECT room.id room_id, room.owner_id, roomMember.user_id, concat(first_name, " ", last_name) as authorName
FROM room 
LEFT JOIN user ON room.owner_id = user.id
LEFT JOIN roomMember ON roomMember.room_id = room.id
WHERE user.id = 1 OR roomMember.user_id = 1;

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
SELECT item.id, item.name, COUNT(vote.user_id) votes, CAST(SUM(CASE WHEN vote.user_id = 1 THEN 1 ELSE 0 END) AS UNSIGNED) voted
FROM item
LEFT JOIN vote
ON item.id = vote.item_id AND item.room_id = vote.room_id
WHERE item.room_id = 2
GROUP BY item.id;

SELECT item.id, item.name, COUNT(vote.user_id) votes, SUM(vote.user_id = 1) AS voted
FROM item
LEFT JOIN vote
ON item.id = vote.item_id AND item.room_id = vote.room_id
WHERE item.room_id = 2
GROUP BY item.id;


SELECT i.id, i.name, COUNT(v.user_id) AS votes, SUM(v.user_id = 1) AS voted
FROM item AS i
LEFT JOIN vote AS v
ON i.id = v.item_id AND i.room_id = v.room_id
WHERE i.room_id = 2
GROUP BY i.id;