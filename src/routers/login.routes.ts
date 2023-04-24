import { Router } from "express";
import { loginController } from './../controllers/login.controllers';
import { validateBodyMiddlewares } from './../middlewares/validateBody.middlewares';
import { loginSchema } from './../schemas/login.schemas';

const loginRoutes: Router = Router();

loginRoutes.post('', validateBodyMiddlewares(loginSchema), loginController)



export default loginRoutes