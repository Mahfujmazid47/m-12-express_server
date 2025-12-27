import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {

        const result = await userServices.createUser(name, email);
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
};

export const userControllers = {
    createUser,
}