import { pool } from "../../config/db";

const createTodo = async (payload: Record<string, unknown>) => {
    const { user_id, title } = payload;
    const result = await pool.query(
        `INSERT INTO todos(name, email) VALUES($1, $2) RETURNING *`, [user_id, title]
    );

    return result;
};

const getTodo = async () => {
    const result = await pool.query(`SELECT * FROM todos`);
    return result;
};

const getSingleTodo = async (id: string) => {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);

    return result;
};

const updateTodo = async (payload: Record<string, unknown>, id: string) => {
    const { title, completed } = payload;

    const result = await pool.query(`UPDATE todos SET name=$1, email=$2 WHERE id=$3 RETURNING *`, [title, completed, id]);

    return result;
};

const deleteTodo = async (id: string) => {
    const result = await pool.query(`DELETE FROM todos WHERE id = $1 `, [id]);
    return result;
}

export const todoServices = {
    createTodo,
    getTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo,
};