// Higher Order function --> perameter na nileo akta function k return korbe

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// roles = ["admin", "user"];
const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            // console.log({ authToken: token });

            if (!token) {
                return res.status(500).json({ message: "You are not allowed!!" });
            }

            const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
            console.log({ decoded });
            req.user = decoded;

            // ["admin"]
            if(roles.length && !roles.includes(decoded.role as string)){
                return res.status(500).json({
                    error:"Unauthorized",
                })
            }

            next();

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
}
export default auth;