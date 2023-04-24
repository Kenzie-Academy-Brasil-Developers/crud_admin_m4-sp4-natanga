import { NextFunction, Request, Response } from "express";
import { AppError } from './../erros';


export const checkIfUserAdminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    if (!req.user.admin) {
        throw new AppError("Insufficient Permission", 403)
    }

    return next()

}