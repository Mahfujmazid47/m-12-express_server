import express, { Request, Response } from "express";
import { pool } from "../../config/db";

const router = express.Router();

// app.use("/users", userRoutes)
// Post a user
router.post("/", async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {

        const result = await pool.query(
            `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]
        );
        // console.log(result.rows[0]);

        res.status(201).json({
            success: true,
            message: "data Inserted",
            data: result.rows[0],
        })

        // res.send({message: "data inserted"})

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }

    // res.status(201).json({
    //     success: true,
    //     message: "API is working",
    // })
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users`);

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully!",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
})

export const userRoutes = router;