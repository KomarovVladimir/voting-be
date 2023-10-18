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