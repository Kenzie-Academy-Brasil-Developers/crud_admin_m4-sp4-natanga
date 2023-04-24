import { QueryResult } from 'pg';
import client from '../../database/config';
import { tUser } from '../../interfaces/user.interfaces';
import { AppError } from '../../erros';

export const putRecoverUsersService = async (idUser: number) => {

    let queryString: string = `
        SELECT 
            *
        FROM
            users
        WHERE
            id = $1;
    `
    const queryResult: QueryResult<tUser> = await client.query(queryString, [idUser])

    if (queryResult.rowCount <= 0) {
        throw new AppError("User nort exist", 400)
    }

    if (queryResult.rows[0].active) {
        throw new AppError("User already active", 400)
    }

    queryString = `
        UPDATE
            users
        SET
            active = true
        WHERE
            id = $1;
    `

    await client.query(queryString, [idUser])
}