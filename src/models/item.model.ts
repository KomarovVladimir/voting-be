import { ItemData } from "types"

import { pool } from "../database/mysql.db"

//TODO: Update the return types
//TODO: Update the params types
//TODO: Add all the checks
export class Item {
    static async add({ name, roomId }: Pick<ItemData, "name" | "roomId">) {
        const sql = `
            INSERT INTO item (name, room_id)
            VALUES(?, ?);
        `
        await pool.execute(sql, [name, roomId])
    }

    static async getByRoomId(roomId: string) {
        const sql = `
            SELECT item.id, item.name, COUNT(vote.user_id) votes
            FROM item
            LEFT JOIN vote
            ON item.id = vote.item_id AND item.room_id = vote.room_id
            WHERE item.room_id = ?
            GROUP BY item.id;
        `
        const [result] = await pool.execute(sql, [roomId])

        return result
    }

    //TODO: Optimize the query
    static async getVotingData({
        userId,
        roomId,
    }: {
        userId: number
        roomId: number
    }) {
        const sql = `
            SELECT item.id, item.name, COUNT(vote.user_id) votes, CAST(SUM(CASE WHEN vote.user_id = ? THEN 1 ELSE 0 END) AS UNSIGNED) voted
            FROM item
            LEFT JOIN vote
            ON item.id = vote.item_id AND item.room_id = vote.room_id
            WHERE item.room_id = ?
            GROUP BY item.id;
        `
        const [result] = await pool.execute(sql, [userId, roomId])

        return result
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM item WHERE id = ?;`
        const [result] = await pool.execute(sql, [id])

        return result
    }

    static async updateById({ id, name }: ItemData) {
        const sql = `
            UPDATE item
            SET name = ?,
            WHERE id = ?;
        `
        await pool.execute(sql, [name, id])
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM item WHERE id = ?;"

        await pool.execute(sql, [id])
    }
}
