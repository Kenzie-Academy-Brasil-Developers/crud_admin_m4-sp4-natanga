import { NextFunction, Request, Response } from 'express';
import client from './../database/config';
import { QueryResult } from 'pg';
import { AppError } from './../erros';


export const checkDeveloperEmailExists = async (req: Request, res: Response, next: NextFunction) => {

    const { email } = req.body

    if (!email) {
        next()
    }
    const queryString: string = `
        SELECT  
            * 
        FROM    
            users
        WHERE 
            email = $1
    ;`

    const queryResult: QueryResult = await client.query(queryString, [email]);

    if (queryResult.rowCount != 0) {
        throw new AppError("E-mail already registered", 409)
    }

    next()

}