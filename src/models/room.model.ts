import { pool } from "../database/mysql.db"

export interface IRoom {
    id: number
    name: string
    status: string
}

export class Room {
    static async add(name: string) {
        const sql = `
            INSERT INTO user (name)
            VALUES(?);
        `
        await pool.execute(sql, [name])
    }

    static async getAll() {
        const sql = "SELECT * FROM room;"
        const [result] = await pool.execute(sql)

        return result
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM room WHERE id = ?;`
        const [result] = await pool.execute(sql, [id])

        return Array.isArray(result) ? (result[0] as IRoom) : result
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
}
