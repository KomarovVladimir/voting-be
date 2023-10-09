import { pool } from "../database/mysql.db"

export interface IItem {
    id: number
    name: string
    roomId: number
}

//TODO: Update the return types
export class Item {
    static async add({ name, roomId }: IItem) {
        const sql = `
            INSERT INTO item (name, room_id)
            VALUES(?, ?);
        `
        await pool.execute(sql, [name, roomId])
    }

    static async getAll() {
        const sql = "SELECT * FROM item;"
        const [result] = await pool.execute(sql)

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
