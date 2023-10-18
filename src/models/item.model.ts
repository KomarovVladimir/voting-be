import { pool } from "../database/mysql.db"

export interface IItem {
    id: number
    name: string
    roomId: number
    votes: number
}

//TODO: Update the return types
//TODO: Add all the checks
export class Item {
    static async add({ name, roomId }: Pick<IItem, "name" | "roomId">) {
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
            ON item.id = vote.item_id
            WHERE item.room_id = ?
            GROUP BY item.id;
        `
        const [result] = await pool.execute(sql, [roomId])

        return result
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM item WHERE id = ?;`
        const [result] = await pool.execute(sql, [id])

        return result
    }

    static async updateById({ id, name }: IItem) {
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
