import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
    const { user_id, title } = req.body;
    try {
        const result = await todoServices.createTodo(req.body);

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
};

const getTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getTodo();

        res.status(200).json({
            success: true,
            message: "todos retrieved successfully!",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
};

const getSingleTodo = async (req: Request, res: Response) => {
        try {

        const result = await todoServices.getSingleTodo(req.params.id as string);

        // console.log(result.rows); // []

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "todos not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "todos fetched successfully!",
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
};

const updateTodo = async (req: Request, res: Response) => {

    try {

        const result = await todoServices.updateTodo(req.body, req.params.id!);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Todos not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Todos updated successfully!",
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
};

const deleteTodo = async (req: Request, res: Response) => {

    try {

        const result = await todoServices.deleteTodo(req.params.id!);

        // console.log(result.rows); // []

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Todo deleted successfully!",
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
};

export const todoControllers = {
    createTodo,
    getTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo,
};