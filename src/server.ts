import express, { NextFunction, Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.route";
import { todoRoutes } from "./modules/todo/todo.route";

const app = express();
const port = config.port;

// parser
app.use(express.json());
// app.use(express.urlencoded()); // Form data ar jonno



// Initializing DB
initDB();




// logger Middleware







// "/" => localhost:5000/
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Next level Developers!')
});



// users CRUD

app.use("/users", userRoutes)

// Post a user
// app.post('/users', async (req: Request, res: Response) => {
//     const { name, email } = req.body;

//     try {

//         const result = await pool.query(
//             `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]
//         );
//         // console.log(result.rows[0]);

//         res.status(201).json({
//             success: true,
//             message: "data Inserted",
//             data: result.rows[0],
//         })

//         // res.send({message: "data inserted"})

//     } catch (err: any) {
//         res.status(500).json({
//             success: false,
//             message: err.message,
//         })
//     }

//     // res.status(201).json({
//     //     success: true,
//     //     message: "API is working",
//     // })
// });

//get all users
// app.get('/users', async (req: Request, res: Response) => {
//     try {
//         const result = await pool.query(`SELECT * FROM users`);

//         res.status(200).json({
//             success: true,
//             message: "Users retrieved successfully!",
//             data: result.rows
//         })

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             details: error
//         })
//     }
// });


// get a single user by id
// app.get('/users/:id', async (req: Request, res: Response) => {

//     // console.log(req.params.id);
//     // res.send({message: "API is cool !!!"});



//     try {

//         const result = await pool.query(`SELECT * FROM users WHERE id = $1 `, [req.params.id]);

//         // console.log(result.rows); // []

//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             })
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "User fetched successfully!",
//                 data: result.rows[0]
//             })
//         }

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             details: error
//         })
//     }
// })


// put (update the user)
// app.put('/users/:id', async (req: Request, res: Response) => {

//     const { name, email } = req.body;

//     try {

//         const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`, [name, email, req.params.id]);

//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             })
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "User updated successfully!",
//                 data: result.rows[0]
//             })
//         }

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             details: error
//         })
//     }
// })



// DELETE a user
// app.delete('/users/:id', )





// TODOs CRUD OPERATIONS
// create a todos

app.use("/todos", todoRoutes);

// app.post("/todos", async (req: Request, res: Response) => {
//     const { user_id, title } = req.body;
//     try {
//         const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);

//         res.status(201).json({
//             success: true,
//             message: "TODO created",
//             data: result.rows[0]
//         })
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// })

//get all todos
// app.get('/todos', async (req: Request, res: Response) => {
//     try {
//         const result = await pool.query(`SELECT * FROM todos`);

//         res.status(200).json({
//             success: true,
//             message: "todos retrieved successfully!",
//             data: result.rows
//         })

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             details: error
//         })
//     }
// });


// Get a single todo
// app.get('/todos/:id', async (req: Request, res: Response) => {
//         try {

//         const result = await pool.query(`SELECT * FROM todos WHERE id = $1 `, [req.params.id]);

//         // console.log(result.rows); // []

//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "todos not found"
//             })
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "todos fetched successfully!",
//                 data: result.rows[0]
//             })
//         }

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             details: error
//         })
//     }
// })

// Update single todo
// app.put('/users/:id', async (req: Request, res: Response) => {

//     const { title, completed } = req.body;

//     try {

//         const result = await pool.query(`UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *`, [title, completed, req.params.id]);

//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "Todos not found"
//             })
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "Todos updated successfully!",
//                 data: result.rows[0]
//             })
//         }

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             details: error
//         })
//     }
// })

// DELETE a todo
// app.delete('/todos/:id', async (req: Request, res: Response) => {

//     try {

//         const result = await pool.query(`DELETE FROM todos WHERE id = $1 RETURNING *`, [req.params.id]);

//         // console.log(result.rows); // []

//         if (result.rowCount === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "Todo not found"
//             })
//         } else {
//             res.status(200).json({
//                 success: true,
//                 message: "Todo deleted successfully!",
//                 data: null  // delete ar khetre null pathai
//             })
//         }

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             details: error
//         })
//     }
// })















// If no routes match 
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found!",
        path: req.path
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
