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
        const [rows] = await pool.execute(sql)

        return rows
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM room WHERE id = ?;`
        const result = await pool.execute(sql, [id])

        return result
    }

    static async updateById(
        id: number,
        { name, status }: Pick<IRoom, "name" | "status">
    ) {
        const sql = `
            UPDATE room
            SET name = ?, status = ?,  
            WHERE id = ?;"
        `
        await pool.execute(sql, [name, status, id])
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM room WHERE id = ?;"

        await pool.execute(sql, [id])
    }
}