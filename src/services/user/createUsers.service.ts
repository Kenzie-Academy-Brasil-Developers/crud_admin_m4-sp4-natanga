
import { QueryResult } from "pg";
import format from "pg-format";
import client from '../../database/config';
import { tCreateUserRequest, tUser, tUserWithoutPassword } from "../../interfaces/user.interfaces";
import { returnUserSchema } from "../../schemas/user.schema";

export const createUsersService = async (userData: tCreateUserRequest): Promise<tUserWithoutPassword> => {

    const queryString: string = format(
        `
        INSERT INTO 
            users(%I)
        VALUES
            (%L)
        RETURNING 
           *
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: QueryResult<tUser> = await client.query(queryString)

    const responseUser: tUserWithoutPassword = returnUserSchema.parse(queryResult.rows[0])


    return responseUser

}