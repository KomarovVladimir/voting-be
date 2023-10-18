import { pool } from "../database/mysql.db"

export interface IVote {
    roomId: number
    userId: number
    itemId: number
}

export class Vote {
    static async vote({ roomId, userId, itemId }: IVote) {
        const sql = `
            INSERT INTO vote (room_id, user_id, item_id)
            VALUES (?, ?, ?);
        `

        await pool.execute(sql, [roomId, userId, itemId])
    }
}
