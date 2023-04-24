import { NextFunction, Request, Response } from 'express';
import client from '../database/config';
import { QueryResult } from 'pg';
import { AppError } from '../erros';


export const checkDeveloperIdExists = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    const queryString: string = `
        SELECT  
            * 
        FROM    
            users
        WHERE 
            id = $1
    ;`

    const queryResult: QueryResult = await client.query(queryString, [id]);

    if (queryResult.rowCount == 0) {

        throw new AppError("User not found", 404)
    }

    next()

}