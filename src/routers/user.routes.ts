import { Router } from "express";
import { checkDeveloperEmailExists } from './../middlewares/checkDeveloperEmailExists.middlewares';
import { validateBodyMiddlewares } from './../middlewares/validateBody.middlewares';
import { ensureDataIsValid } from './../schemas/user.schema';
import { createdUserController, getUsersController, getProfileController, deleteProfileController, updateProfileController, putRecoverProfileController } from './../controllers/user.controllers';
import { ensureTokenIsValid } from './../middlewares/ensureTokenIsValid.middlewares';
import { checkIfUserAdminMiddleware } from './../middlewares/checkIfUserAdmin.middleware';
import { confirmUser } from './../middlewares/confirmUser.middlewares';

const usersRoutes: Router = Router();

usersRoutes.post('', checkDeveloperEmailExists, validateBodyMiddlewares(ensureDataIsValid), createdUserController);
usersRoutes.get('', ensureTokenIsValid, checkIfUserAdminMiddleware, getUsersController)
usersRoutes.get('/profile', ensureTokenIsValid, getProfileController)
usersRoutes.patch('/:id', ensureTokenIsValid, validateBodyMiddlewares(ensureDataIsValid), checkDeveloperEmailExists, updateProfileController)
usersRoutes.delete('/:id', ensureTokenIsValid, confirmUser, deleteProfileController)
usersRoutes.put('/:id/recover', ensureTokenIsValid, checkIfUserAdminMiddleware, confirmUser, putRecoverProfileController)



export default usersRoutes