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
            INSERT INTO item (name, votes, room_id)
            VALUES(?, 0, ?);
        `
        await pool.execute(sql, [name, roomId])
    }

    static async getAll(roomId: string) {
        const sql = "SELECT * FROM item WHERE room_id =  ?;"
        const [result] = await pool.execute(sql, [roomId])

        return result
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM item WHERE id = ?;`
        const [result] = await pool.execute(sql, [id])

        return result
    }

    static async updateById({ id, name, votes }: IItem) {
        const sql = `
            UPDATE item
            SET name = ?, votes = ?,
            WHERE id = ?;
        `
        await pool.execute(sql, [name, votes, id])
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM item WHERE id = ?;"

        await pool.execute(sql, [id])
    }
}
