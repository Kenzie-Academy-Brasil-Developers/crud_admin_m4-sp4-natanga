import { z } from "zod";
import { CreateUserRequestSchema } from './../schemas/user.schema';

export type tCreateUserRequest = z.infer<typeof CreateUserRequestSchema>

export type tUser = {
    id: string
    name: string;
    email: string;
    password: string;
    admin?: boolean | undefined;
    active?: boolean | undefined;
}