import { ResultSetHeader, RowDataPacket } from "mysql2/promise"
import { pool } from "../database/mysql.db"

export interface IUser {
    id: number
    email: string
    password: string
    firstName?: string
    lastName?: string
}

//TODO: Add an actual login logic
//TODO: Add a timestamp tracking
//TODO: Update the return types
export class User {
    static async insert({ email, password, firstName, lastName }: IUser) {
        // const timestamp = new Date().getTime()
        const sql = `
            INSERT INTO user (email, password, first_name, last_name)
            VALUES(?, ?, ?, ?);
        `

        const result = await pool.execute<ResultSetHeader>(sql, [
            email,
            password,
            firstName,
            lastName,
        ])

        return result[0].insertId
    }

    static async getAll() {
        const sql = "SELECT * FROM user;"
        const [result] = await pool.execute(sql)

        return result
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM user WHERE id = ?;`
        const [result] = await pool.execute(sql, [id])

        return result
    }

    static async updateById({
        id,
        email,
        password,
        firstName,
        lastName,
    }: IUser) {
        const sql = `
            UPDATE user
            SET email = ?, password = ?, first_name = ?, last_name = ?,  
            WHERE id = ?;
        `
        await pool.execute(sql, [email, password, firstName, lastName, id])
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM user WHERE id = ?;"

        await pool.execute(sql, [id])
    }

    static async findByEmail(email: string) {
        const sql = `SELECT * FROM user WHERE email = ?;`

        const [result] = await pool.execute<RowDataPacket[]>(sql, [email])

        return result[0]
    }
}
