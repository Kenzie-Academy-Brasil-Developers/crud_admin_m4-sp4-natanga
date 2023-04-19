import { Request, Response } from 'express';
import { tCreateUserRequest, tUser } from '../interfaces/user.interfaces';
import { createUserService } from '../services/user.service';


export const createdUserController = async (req: Request<{}, {}, tCreateUserRequest>, res: Response): Promise<Response> => {

    const { body } = req

    const newUser: tUser = await createUserService(body)

    return res.status(201).json(newUser)
}