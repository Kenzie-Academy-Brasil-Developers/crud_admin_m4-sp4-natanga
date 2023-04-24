import { Request, Response } from 'express';
import { tCreateUserRequest, tUser, tUserWithoutPassword } from '../interfaces/user.interfaces';
import { createUsersService } from '../services/user/createUsers.service';
import { getUsersService } from './../services/user/getUsers.service';
import { getProfileService } from './../services/user/getProfile.service';
import { updateUsersService } from './../services/user/updateUsers.service';
import { putRecoverUsersService } from './../services/user/putRecoverUsers.service';
import { deleteUsersService } from '../services/user/deleteUsers.service';

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

    return res.status(200).json(updateUser)
}

export const putRecoverProfileController = async (req: Request, res: Response): Promise<Response> => {

    const recoverUser = await putRecoverUsersService(parseInt(req.params.id))

    return res.status(200).json(recoverUser)
}

export const deleteProfileController = async (req: Request, res: Response): Promise<Response> => {

    await deleteUsersService(parseInt(req.params.id))

    return res.status(204).json()
}