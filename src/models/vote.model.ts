import { VoteData } from "types"

import { pool } from "../database/mysql.db"

export class Vote {
    static async add({ roomId, userId, itemId }: VoteData) {
        const sql = `
            INSERT INTO vote (room_id, user_id, item_id)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE item_id = ?;
        `

        await pool.execute(sql, [roomId, userId, itemId, itemId])
    }

    static async delete({ roomId, userId, itemId }: VoteData) {
        const sql = `
            DELETE FROM vote
            WHERE room_id = ? AND user_id = ? AND item_id = ?;
        `

        await pool.execute(sql, [roomId, userId, itemId])
    }
}
