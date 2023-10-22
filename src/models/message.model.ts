import { ResultSetHeader, RowDataPacket } from "mysql2/promise"
import moment from "moment"

import { MessageData } from "types"

import { pool } from "../database/mysql.db"

//TODO: Update the return types
//TODO: Add all the checks
export class Message {
    static async add({
        roomId,
        userId,
        text,
        postingDate,
    }: Pick<MessageData, "roomId" | "userId" | "text" | "postingDate">) {
        const mysqlTimestamp = moment(postingDate).format("YYYY-MM-DD HH:mm:ss")
        const sql = `
            INSERT INTO message (room_id, user_id, text, created)
            VALUES (?, ?, ?, ?);
        `

        const [result] = await pool.execute<ResultSetHeader>(sql, [
            roomId,
            userId,
            text,
            mysqlTimestamp,
        ])

        return result
    }

    static async getByRoomId(roomId: string) {
        const sql = `
            SELECT m.id, text, m.created, m.last_updated lastUpdated, user_id userId, CONCAT(u.first_name, " ", u.last_name) username
            FROM message AS m
            LEFT JOIN user AS u
            ON m.user_id = u.id
            WHERE room_id = ?;
        `
        const [result] = await pool.execute<RowDataPacket[]>(sql, [roomId])

        return result as MessageData[]
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM message WHERE id = ?;`
        const [result] = await pool.execute<RowDataPacket[]>(sql, [id])

        return result[0] as MessageData
    }

    static async updateById({ id, text }: Pick<MessageData, "id" | "text">) {
        const currentDate = Date.now()
        const sql = `
            UPDATE message
            SET text = ?, updating_date = ?
            WHERE id = ?;
        `
        const [result] = await pool.execute<ResultSetHeader>(sql, [
            text,
            currentDate,
            id,
        ])

        return result
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM message WHERE id = ?;"

        const [result] = await pool.execute<ResultSetHeader>(sql, [id])

        return result
    }
}
