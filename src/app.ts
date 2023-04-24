import express, { Application, json } from 'express'
import 'express-async-errors'
import { handleErros } from './erros';
import usersRoutes from './routers/user.routes';
import loginRoutes from './routers/login.routes';

const app: Application = express()
app.use(json())

app.use('/users', usersRoutes)
app.use('/login', loginRoutes)

app.use(handleErros)

export default app
