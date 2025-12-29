import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoControllers } from "./todo.controller";

const router = express.Router();

// app.use("/users", userRoutes)

// routes --> controller --> service
// routes --> req,res --> business logics(result)

// Post a user
router.post("/", todoControllers.createTodo);

router.get("/", todoControllers.getTodo);

router.get("/:id", todoControllers.getSingleTodo);

router.put("/:id", todoControllers.updateTodo);

router.delete("/:id", todoControllers.deleteTodo);

export const todoRoutes = router;