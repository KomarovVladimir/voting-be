import { pool } from "../database/mysql.db"

export interface IUser {
    id: number
    email: string
    password: string
    firstName?: string
    lastName?: string
}

export class User {
    static async add({ email, password, firstName, lastName }: IUser) {
        const timestamp = new Date().getTime()
        const sql = `
            INSERT INTO user (email, password, first_name, last_name, creation_date)
            VALUES(?, ?, ?, ?, ?, ?)
        `
        await pool.execute(sql, [
            email,
            password,
            firstName,
            lastName,
            timestamp,
        ])
    }

    static async getAll() {
        const sql = "SELECT * FROM user"
        const [rows] = await pool.execute(sql)

        return rows
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM user WHERE user_id = ,`
        const result = await pool.execute(sql, [id])

        return result
    }

    static async updateById(
        id: number,
        { email, password, firstName, lastName }: IUser
    ) {
        const sql = `
            UPDATE user
            SET email = ?, password = ?, first_name = ?, last_name = ?,  
            WHERE id = ?"
        `
        await pool.execute(sql, [email, password, firstName, lastName, id])
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM users WHERE id = ?"

        await pool.execute(sql, [id])
    }
}
