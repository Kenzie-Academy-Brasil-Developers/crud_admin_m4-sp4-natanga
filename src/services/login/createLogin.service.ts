import { QueryResult } from 'pg';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import client from './../../database/config';
import { IloginRequest, IloginResponse } from '../../interfaces/login.interfaces';
import { AppError } from './../../erros';

export const createLogin = async (dataLogin: IloginRequest) => {

    if (!dataLogin.email && !dataLogin.password) {
        throw new AppError("Wrong email/password", 400)
    }

    const queryString: string = `
        SELECT
            *
        FROM 
            users
        WHERE
            email = $1
    `

    const queryResult: QueryResult<IloginResponse> = await client.query(queryString, [dataLogin.email])

    
    if (queryResult.rowCount == 0) {
        throw new AppError("Wrong email/password", 401)
    }
    
    const machPassword: boolean = await compare(dataLogin.password, queryResult.rows[0].password)

    if (!machPassword || !queryResult.rows[0].active) {
        throw new AppError("Wrong email/password", 401)
    }

    const token = jwt.sign(
        {
            admin: queryResult.rows[0].admin,
            active: queryResult.rows[0].active
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: queryResult.rows[0].id.toString()
        }
    )

    return token
}