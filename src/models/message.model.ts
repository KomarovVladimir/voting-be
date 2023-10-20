import moment from "moment"

import { pool } from "../database/mysql.db"

export interface IMessage {
    id: number
    roomId: number
    userId: number
    text: string
    postingDate: Date
    lastUpdate: Date
}

//TODO: Update the return types
//TODO: Add all the checks
export class Message {
    static async add({
        roomId,
        userId,
        text,
        postingDate,
    }: Pick<IMessage, "roomId" | "userId" | "text" | "postingDate">) {
        const mysqlTimestamp = moment(postingDate).format("YYYY-MM-DD HH:mm:ss")
        const sql = `
            INSERT INTO message (room_id, user_id, text, created)
            VALUES (?, ?, ?, ?);
        `

        await pool.execute(sql, [roomId, userId, text, mysqlTimestamp])
    }

    static async getByRoomId(roomId: string) {
        const sql = `
            SELECT m.id, text, m.created, m.last_updated lastUpdated, user_id userId, CONCAT(u.first_name, " ", u.last_name) username
            FROM message AS m
            LEFT JOIN user AS u
            ON m.user_id = u.id
            WHERE room_id = ?;
        `
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
