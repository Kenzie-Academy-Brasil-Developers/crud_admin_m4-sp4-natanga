import { Router } from "express";
import { checkDeveloperEmailExists } from './../middlewares/checkDeveloperEmailExists.middlewares';
import { validateBodyMiddlewares } from './../middlewares/validateBody.middlewares';
import { createdUserController, getUsersController, getProfileController, deleteProfileController, updateProfileController, putRecoverProfileController } from './../controllers/user.controllers';
import { ensureTokenIsValid } from './../middlewares/ensureTokenIsValid.middlewares';
import { checkIfUserAdminMiddleware } from './../middlewares/checkIfUserAdmin.middleware';
import { confirmUser } from './../middlewares/confirmUser.middlewares';
import { createUserSchema, UserUpdateSchema } from './../schemas/users.schemas';
import { checkDeveloperIdExists } from './../middlewares/checkDeveloperIdExists.middlewares';

const usersRoutes: Router = Router();

usersRoutes.post('', checkDeveloperEmailExists, validateBodyMiddlewares(createUserSchema), createdUserController);
usersRoutes.get('', ensureTokenIsValid, checkIfUserAdminMiddleware, getUsersController)
usersRoutes.get('/profile', ensureTokenIsValid, checkIfUserAdminMiddleware, getProfileController)
usersRoutes.patch('/:id', ensureTokenIsValid, confirmUser, validateBodyMiddlewares(UserUpdateSchema), checkDeveloperIdExists, updateProfileController)
usersRoutes.delete('/:id', ensureTokenIsValid, confirmUser, checkDeveloperIdExists, deleteProfileController)
usersRoutes.put('/:id/recover', ensureTokenIsValid, checkIfUserAdminMiddleware, checkDeveloperIdExists, putRecoverProfileController)



export default usersRoutes