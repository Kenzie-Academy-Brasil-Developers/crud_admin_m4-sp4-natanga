import { tCreateUserRequest, tUser } from "../interfaces/user.interfaces";
import client from './../database/config';
import format from 'pg-format';
import { QueryResult } from "pg";

export const createUserService = async (newUser: tCreateUserRequest): Promise<tUser> => {

    const queryString: string = format(`
    INSERT INTO 
        users
    SET
        (%I) = 
    ROW 
        (%L)
    RETURNING *
    ;`,
        Object.keys(newUser),
        Object.values(newUser)
    )

    const queryResult: QueryResult = await client.query(queryString)

    return queryResult.rows[0]
}