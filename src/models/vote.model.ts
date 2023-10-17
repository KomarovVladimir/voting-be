import { pool } from "../database/mysql.db"

export interface IVote {
    roomId: number
    userId: number
    itemId: number
}

export class Vote {
    static async vote({ roomId, userId, itemId }: IVote) {
        const sql = `
            INSERT INTO roomMember (roomId, userId, itemId)
            VALUES (?, ?, ?);
        `

        await pool.execute(sql, [roomId, userId, itemId])
    }
}
