import { ResultSetHeader, RowDataPacket } from "mysql2/promise"

import { UserData } from "types"

import { pool } from "../database/mysql.db"

//TODO: Add an actual login logic
//TODO: Add a timestamp tracking
export class User {
    static async insert({ email, password, firstName, lastName }: UserData) {
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

        const [result] = await pool.execute<RowDataPacket[]>(sql)

        return result as UserData[]
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM user WHERE id = ?;`

        const [result] = await pool.execute<RowDataPacket[]>(sql, [id])

        return result[0] as UserData
    }

    static async updateById({
        id,
        email,
        password,
        firstName,
        lastName,
    }: UserData) {
        const sql = `
            UPDATE user
            SET email = ?, password = ?, first_name = ?, last_name = ?,  
            WHERE id = ?;
        `
        const [result] = await pool.execute<ResultSetHeader>(sql, [
            email,
            password,
            firstName,
            lastName,
            id,
        ])

        return result
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM user WHERE id = ?;"

        const [result] = await pool.execute<ResultSetHeader>(sql, [id])

        return result
    }

    static async findByEmail(email: string) {
        const sql = `SELECT * FROM user WHERE email = ?;`

        const [result] = await pool.execute<RowDataPacket[]>(sql, [email])

        return result[0]
    }
}
