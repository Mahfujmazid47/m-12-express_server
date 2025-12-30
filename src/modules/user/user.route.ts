import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = express.Router();

// app.use("/users", userRoutes)

// routes --> controller --> service
// routes --> req,res --> business logics(result)

// Post a user
router.post("/", userControllers.createUser);

router.get("/", logger, auth(), userControllers.getUser);

router.get("/:id", userControllers.getSingleUser);

router.put("/:id", userControllers.updateUser);

router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;