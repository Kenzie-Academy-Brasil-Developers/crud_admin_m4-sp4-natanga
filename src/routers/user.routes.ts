import { Router } from "express";
import { validateBodyMiddlewares } from './../middlewares/validateBody.middlewares';
import { ensureDataIsValid } from './../schemas/user.schema';
import { createdUserController } from '../controllers/user.controllers';
import { checkDeveloperEmailExists } from './../middlewares/checkDeveloperEmailExists.middlewares';

const usersRoutes: Router = Router();

usersRoutes.post('', validateBodyMiddlewares(ensureDataIsValid), checkDeveloperEmailExists, createdUserController);
usersRoutes.get('',)
usersRoutes.get('/profile',)
usersRoutes.patch('/:id', validateBodyMiddlewares(ensureDataIsValid), checkDeveloperEmailExists)
usersRoutes.delete('/:id',)
usersRoutes.put('/:id/recover',)



export default usersRoutes