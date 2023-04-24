import client from '../../database/config';

export const deleteUsersService = async (idUser: number) => {

    const queryString: string = `
        UPDATE
            users
        SET
            active = false
        WHERE
            id = $1;
    `

    await client.query(queryString, [idUser])
}