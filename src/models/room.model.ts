import moment from "moment"
import { ResultSetHeader, RowDataPacket } from "mysql2"

import { roomStatuses } from "common"
import { RoomData, UserData } from "types"
import { pool } from "database"

//TODO: Split into classes?
export class Room {
    static async add({
        userId,
        name,
        creationDate,
    }: Pick<RoomData, "userId" | "name" | "creationDate">) {
        const mysqlTimestamp = moment(creationDate).format(
            "YYYY-MM-DD HH:mm:ss"
        )

        const sql = `
            INSERT INTO room (owner_id, name, created, status)
            VALUES(?, ?, ?, ?);
        `

        const [result] = await pool.execute<ResultSetHeader>(sql, [
            userId,
            name,
            mysqlTimestamp,
            roomStatuses.PENDING,
        ])

        return result
    }

    static async getAll() {
        const sql = `
            SELECT id, owner_id ownerId, name, status
            FROM room;
        `
        const [result] = await pool.execute<RowDataPacket[]>(sql)

        return result as RoomData[]
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM room WHERE id = ?;`
        const [result] = await pool.execute<RowDataPacket[]>(sql, [id])

        return result[0] as RoomData
    }

    static async getByUser(userId: number) {
        const sql = `
            SELECT DISTINCT r.id, r.name, concat(first_name, " ", last_name) as authorName, r.owner_id = ? AS isOwner
            FROM room AS r
            LEFT JOIN user AS u ON r.owner_id = u.id
            LEFT JOIN room_member AS rm ON rm.room_id = r.id
            WHERE u.id = ? OR rm.user_id = ?;
        `

        const [result] = await pool.execute<RowDataPacket[]>(sql, [
            userId,
            userId,
            userId,
        ])

        return result as RoomData[]
    }

    static async updateById({ id, name, status }: RoomData) {
        const sql = `
            UPDATE room
            SET name = ?, status = ?  
            WHERE id = ?;
        `
        const [result] = await pool.execute<ResultSetHeader>(sql, [
            name,
            status,
            id,
        ])

        return result
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM room WHERE id = ?;"

        const [result] = await pool.execute<ResultSetHeader>(sql, [id])

        return result
    }

    static async joinRoom({ roomId, userId }: Record<string, number>) {
        const sql = `
            INSERT INTO room_member (room_id, user_id)
            VALUES (?, ?);
        `

        const [result] = await pool.execute<ResultSetHeader>(sql, [
            roomId,
            userId,
        ])

        return result
    }

    static async leaveRoom({ roomId, userId }: Record<string, number>) {
        const sql = `
            DELETE FROM room_member
            WHERE room_id = ? AND user_id = ?;
        `

        const [result] = await pool.execute<ResultSetHeader>(sql, [
            roomId,
            userId,
        ])

        return result
    }

    static async getRoomMembers(roomId: number) {
        const sql = `
            SELECT u.id, CONCAT(first_name, " ", last_name) username, email
            FROM room_member AS rm
            LEFT JOIN user AS u
            ON rm.user_id = u.id
            WHERE rm.room_id = ?;
        `

        const [result] = await pool.execute<RowDataPacket[]>(sql, [roomId])

        return result as UserData[]
    }

    static async excludeMemberById({ roomId, userId }: Record<string, number>) {
        const sql = `
            DELETE FROM room_member AS rm
            WHERE rm.room_id = ? AND rm.user_id = ?;
        `

        const [result] = await pool.execute<ResultSetHeader>(sql, [
            roomId,
            userId,
        ])

        return result
    }
}
