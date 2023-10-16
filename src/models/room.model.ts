import moment from "moment"

import { roomStatuses } from "@common/roomStatuses"

import { pool } from "../database/mysql.db"

export interface IRoom {
    id: number
    userId: number
    name: string
    status: string
    creationDate: Date
    lastUpdate: Date
}

export class Room {
    static async add({
        userId,
        name,
        creationDate,
    }: Pick<IRoom, "userId" | "name" | "creationDate">) {
        const mysqlTimestamp = moment(creationDate).format(
            "YYYY-MM-DD HH:mm:ss"
        )
        const sql = `
            INSERT INTO room (owner_id, name, created, status)
            VALUES(?, ?, ?, ?);
        `

        await pool.execute(sql, [
            userId,
            name,
            mysqlTimestamp,
            roomStatuses.PENDING,
        ])
    }

    static async getAll() {
        const sql = `
            SELECT id, owner_id ownerId, name, status
            FROM room;
        `
        const [result] = await pool.execute(sql)

        return result
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM room WHERE id = ?;`
        const [result] = await pool.execute(sql, [id])

        return Array.isArray(result) ? (result[0] as IRoom) : result
    }

    static async getByUser(userId: number) {
        const sql = `
            SELECT * FROM room
            INNER JOIN roomUser
            ON room.id = roomUser.room_id
            INNER JOIN user
            ON roomUser.user_id = user.id
            WHERE user.id = ?;
        `
        const [result] = await pool.execute(sql, [userId])

        return result
    }

    static async updateById({ id, name, status }: IRoom) {
        const sql = `
            UPDATE room
            SET name = ?, status = ?  
            WHERE id = ?;
        `
        await pool.execute(sql, [name, status, id])
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM room WHERE id = ?;"

        await pool.execute(sql, [id])
    }

    static async joinRoom({ roomId, userId }: Record<string, number>) {
        const sql = `
            INSERT INTO roomUser (room_id, user_id)
            VALUES (?, ?);
        `

        await pool.execute(sql, [roomId, userId])
    }

    static async leaveRoom({ roomId, userId }: Record<string, number>) {
        const sql = `
            DELETE FROM roomUser
            WHERE room_id = ? AND user_id = ?;
        `

        await pool.execute(sql, [roomId, userId])
    }
}
