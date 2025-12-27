import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router();

// app.use("/users", userRoutes)

// routes --> controller --> service
// routes --> req,res --> business logics(result)

// Post a user
router.post("/", userControllers.createUser);

router.get("/", userControllers.getUser)

export const userRoutes = router;