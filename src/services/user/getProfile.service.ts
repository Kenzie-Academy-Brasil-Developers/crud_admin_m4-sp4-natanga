
import {  QueryResult } from "pg";
import client from './../../database/config';
import { tUserWithoutPassword } from "../../interfaces/user.interfaces";
import { returnUserSchema } from "../../schemas/user.schema";

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
    
    const queryResult: QueryResult<tUserWithoutPassword> = await client.query(queryString,[userId])


    const responseUser = returnUserSchema.parse(queryResult.rows[0])

    return responseUser
}