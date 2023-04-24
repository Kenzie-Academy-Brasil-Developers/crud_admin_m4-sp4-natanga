
import { QueryResult } from "pg";
import { tUser, tUserWithoutPassword } from "../interfaces/user.interfaces";
import { returnUserSchema } from "../schemas/user.schema";
import client from './../database/config';

export const getUsersService = async (): Promise<tUserWithoutPassword[]> => {
    
    const queryString: string =
        `
        SELECT
           *
        FROM
           users
        `

    const queryResult: QueryResult<tUser> = await client.query(queryString)

    const responseUser: tUserWithoutPassword[] = queryResult.rows.map(user => returnUserSchema.parse(user))

    return responseUser

}