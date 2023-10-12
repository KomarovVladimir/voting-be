import { pool } from "../database/mysql.db"

export interface IMessage {
    id: number
    roomId: number
    userId: number
    text: string
    postingDate: Date
    updatingDate: Date
}

//TODO: Update the return types
//TODO: Add all the checks
export class Message {
    static async add({
        roomId,
        userId,
        text,
    }: Pick<IMessage, "roomId" | "userId" | "text">) {
        const currentDate = Date.now()
        const sql = `
            INSERT INTO message (room_id, user_id, text, posting_date)
            VALUES (?, ?, ?, ?);
        `
        await pool.execute(sql, [roomId, userId, text, currentDate])
    }

    static async getAll(roomId: string) {
        const sql = "SELECT * FROM message WHERE room_id = ?;"
        const [result] = await pool.execute(sql, [roomId])

        return result
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM message WHERE id = ?;`
        const [result] = await pool.execute(sql, [id])

        return result
    }

    static async updateById({ id, text }: Pick<IMessage, "id" | "text">) {
        const currentDate = Date.now()
        const sql = `
            UPDATE message
            SET text = ?, updating_date = ?
            WHERE id = ?;
        `
        await pool.execute(sql, [text, currentDate, id])
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM message WHERE id = ?;"

        await pool.execute(sql, [id])
    }
}
