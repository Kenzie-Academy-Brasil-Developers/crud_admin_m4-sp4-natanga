import { QueryResult } from 'pg';
import client from '../../database/config';
import { tUser, tUserWithoutPassword } from '../../interfaces/user.interfaces';
import { AppError } from '../../erros';
import { returnUserSchema } from '../../schemas/users.schemas';

export const putRecoverUsersService = async (idUser: number): Promise<tUserWithoutPassword> => {

    let queryString: string = `
        SELECT 
            *
        FROM
            users
        WHERE
            id = $1;
    `
    let queryResult: QueryResult<tUser> = await client.query(queryString, [idUser])

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
            id = $1
        RETURNING * 
        ;
    `

    queryResult = await client.query(queryString, [idUser])

    const responseUser: tUserWithoutPassword = returnUserSchema.parse(queryResult.rows[0])

    return responseUser

}