import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny } from 'zod'
import { AppError } from '../erros';


export const confirmUser = (req: Request, res: Response, next: NextFunction) => {

    if (req.user.idUser !== parseInt(req.params.id) && !req.user.admin && req.method == 'DELETE') {
        throw new AppError("you are trying to delete a person who is not you", 400)
    }

    if (req.user.idUser !== parseInt(req.params.id) && !req.user.admin && req.method == 'POST') {
        throw new AppError("you are trying to upgrade a person who is not you", 400)
    }

    next()

}

