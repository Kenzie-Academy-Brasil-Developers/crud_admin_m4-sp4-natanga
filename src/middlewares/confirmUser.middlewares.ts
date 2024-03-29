import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny } from 'zod'
import { AppError } from '../erros';


export const confirmUser = (req: Request, res: Response, next: NextFunction) => {

    
    if (!req.user.admin) {
        if (Number(req.params.id) !== req.user.idUser) {
            throw new AppError("Insufficient Permission", 403)
        }
    }

    next()

}

