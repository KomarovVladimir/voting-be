import { pool } from "../database/mysql.db"

export interface IVote {
    roomId: number
    userId: number
    itemId: number
}

export class Vote {
    static async add({ roomId, userId, itemId }: IVote) {
        const sql = `
            INSERT INTO vote (room_id, user_id, item_id)
            VALUES (?, ?, ?);
        `

        await pool.execute(sql, [roomId, userId, itemId])
    }

    static async delete({ roomId, userId, itemId }: IVote) {
        const sql = `
            DELETE FROM vote
            WHERE room_id = ? AND user_id = ? AND item_id = ?;
        `

        await pool.execute(sql, [roomId, userId, itemId])
    }
}
