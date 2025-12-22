import express, { Request, Response } from "express";
import { Pool } from "pg"; // npx neonctl@latest init
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = 5000;

// parser
app.use(express.json());
// app.use(express.urlencoded()); // Form data ar jonno



// DB (PostgraseSQL)
const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STR}`
});

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(200),
            description TEXT,
            due_date DATE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)
};

initDB();









app.get('/', (req: Request, res: Response) => {
    res.send('Hello Next level Developers!')
});



// users CRUD
// Post a user
app.post('/users', async (req: Request, res: Response) => {
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

//get all users
app.get('/users', async (req: Request, res: Response) => {
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
});


// get a single user by id
app.get('/users/:id', async (req: Request, res: Response) => {

    // console.log(req.params.id);
    // res.send({message: "API is cool !!!"});



    try {

        const result = await pool.query(`SELECT * FROM users WHERE id = $1 `, [req.params.id]);

        // console.log(result.rows); // []

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User fetched successfully!",
                data: result.rows[0]
            })
        }

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
})


// put (update the user)
app.put('/users/:id', async (req: Request, res: Response) => {

    const { name, email } = req.body;

    try {

        const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`, [name, email, req.params.id]);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: result.rows[0]
            })
        }

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
})



// DELETE a user
app.delete('/users/:id', async (req: Request, res: Response) => {

    try {

        const result = await pool.query(`DELETE FROM users WHERE id = $1 `, [req.params.id]);

        // console.log(result.rows); // []

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: null  // delete ar khetre null pathai
            })
        }

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
})





// TODOs CRUD OPERATIONS
// create a todos
app.post("/todos", async (req: Request, res: Response) => {
    const { user_id, title } = req.body;
    try {
        const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);

        res.status(201).json({
            success: true,
            message: "TODO created",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
