DELETE FROM room_member AS rm
WHERE rm.room_id = ? AND rm.user_id = ?;