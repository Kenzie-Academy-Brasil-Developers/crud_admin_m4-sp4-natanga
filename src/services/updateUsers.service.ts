
import { QueryResult, QueryConfig } from "pg";
import { returnUserSchema } from "../schemas/user.schema";
import client from './../database/config';
import format from "pg-format";
import { tUser, tUserWithoutPassword } from "../interfaces/user.interfaces";

export const updateUsersService = async (dataUserUpadate: any, idUser: number): Promise<tUserWithoutPassword> => {

    
    const queryString: string = format(`
        UPDATE
            users
        SET
          (%I) = ROW (%L)
        WHERE
            id = $1
          RETURNING *;
        `,
        Object.keys(dataUserUpadate),
        Object.values(dataUserUpadate)
    )
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idUser]
    }

    const queryResult: QueryResult<tUser> = await client.query(queryConfig)

    const responseUser: tUserWithoutPassword = returnUserSchema.parse(queryResult.rows[0])

    return responseUser

}