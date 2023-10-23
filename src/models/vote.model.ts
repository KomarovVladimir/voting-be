import { ResultSetHeader } from "mysql2/promise"

import { VoteData } from "types"
import { pool } from "database"

export class Vote {
    static async add({ roomId, userId, itemId }: VoteData) {
        const sql = `
            INSERT INTO vote (room_id, user_id, item_id)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE item_id = ?;
        `

        const [result] = await pool.execute<ResultSetHeader>(sql, [
            roomId,
            userId,
            itemId,
            itemId,
        ])

        return result
    }

    static async delete({ roomId, userId, itemId }: VoteData) {
        const sql = `
            DELETE FROM vote
            WHERE room_id = ? AND user_id = ? AND item_id = ?;
        `

        const [result] = await pool.execute<ResultSetHeader>(sql, [
            roomId,
            userId,
            itemId,
        ])

        return result
    }
}
