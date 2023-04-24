import { Request, Response } from 'express';
import { tCreateUserRequest, tUser, tUserWithoutPassword } from '../interfaces/user.interfaces';
import { createUsersService } from './../services/createUsers.service';
import { getUsersService } from './../services/getUsers.service';
import { getProfileService } from './../services/getProfile.service';
import { updateUsersService } from './../services/updateUsers.service';
import { putRecoverUsersService } from './../services/putRecoverUsers.service';
import { deleteUsersService } from './../services/deleteUsers.service';

export const createdUserController = async (req: Request<{}, {}, tCreateUserRequest>, res: Response): Promise<Response> => {

    const { body } = req

    const newUser: tUserWithoutPassword = await createUsersService(body)

    return res.status(201).json(newUser)
}

export const getUsersController = async (req: Request, res: Response): Promise<Response> => {

    const listUsers: tUserWithoutPassword[] = await getUsersService()

    return res.status(200).json(listUsers)
}
export const getProfileController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = req.user.idUser

    const Profile: tUserWithoutPassword = await getProfileService(userId)

    return res.status(200).json(Profile)
}

export const updateProfileController = async (req: Request, res: Response): Promise<Response> => {

    const updateUser = await updateUsersService(req.body, parseInt(req.params.id))

    return res.status(201).json(updateUser)
}

export const putRecoverProfileController = async (req: Request, res: Response): Promise<Response> => {

    const newUser = await putRecoverUsersService(parseInt(req.params.id))

    return res.status(200).json(newUser)
}

export const deleteProfileController = async (req: Request, res: Response): Promise<Response> => {

    const newUser = await deleteUsersService(parseInt(req.params.id))

    return res.status(200).json(newUser)
}