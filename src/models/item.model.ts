import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { ItemData } from "types";

import { pool } from "database";

//TODO: Update the return types
//TODO: Update the params types
//TODO: Add all the checks
export class Item {
    static async add({ name, roomId }: Pick<ItemData, "name" | "roomId">) {
        const sql = `
            INSERT INTO item (name, room_id)
            VALUES(?, ?);
        `;
        const [result] = await pool.execute<ResultSetHeader>(sql, [
            name,
            roomId,
        ]);

        return result;
    }

    static async getByRoomId({
        userId,
        roomId,
    }: {
        userId: number;
        roomId: number;
    }) {
        const sql = `
            SELECT item.id, item.name, COUNT(vote.user_id) votes, CAST(SUM(CASE WHEN vote.user_id = ? THEN 1 ELSE 0 END) AS UNSIGNED) voted
            FROM item
            LEFT JOIN vote
            ON item.id = vote.item_id AND item.room_id = vote.room_id
            WHERE item.room_id = ?
            GROUP BY item.id;
        `;
        const [result] = await pool.execute<RowDataPacket[]>(sql, [
            userId,
            roomId,
        ]);

        return result as ItemData[];
    }

    static async getById(id: number) {
        const sql = `SELECT * FROM item WHERE id = ?;`;
        const [result] = await pool.execute<RowDataPacket[]>(sql, [id]);

        return result[0] as ItemData;
    }

    static async updateById({ id, name }: ItemData) {
        const sql = `
            UPDATE item
            SET name = ?,
            WHERE id = ?;
        `;
        const [result] = await pool.execute<ResultSetHeader>(sql, [name, id]);

        return result;
    }

    static async deleteById(id: number) {
        const sql = "DELETE FROM item WHERE id = ?;";

        const [result] = await pool.execute<ResultSetHeader>(sql, [id]);

        return result;
    }
}
