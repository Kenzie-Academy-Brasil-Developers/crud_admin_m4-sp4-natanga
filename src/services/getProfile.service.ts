
import { QueryConfig, QueryResult } from "pg";
import { tUserWithoutPassword } from "../interfaces/user.interfaces";
import { returnUserSchema } from "../schemas/user.schema";
import client from './../database/config';

export const getProfileService = async (userId: number): Promise<tUserWithoutPassword> => {

    const queryString: string =
        `
        SELECT
           *
        FROM
           users
        WHERE 
            id= $1
        `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: QueryResult<tUserWithoutPassword> = await client.query(queryConfig)


    const responseUser = returnUserSchema.parse(queryResult.rows[0])

    return responseUser
}