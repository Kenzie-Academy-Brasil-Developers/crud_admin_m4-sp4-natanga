import { z } from "zod";
import { UserSchema, createUserSchema, returnUserSchema } from './../schemas/users.schemas';

export type tUser = z.infer<typeof UserSchema>

export type tCreateUserRequest = z.infer<typeof createUserSchema>

export type tUserWithoutPassword = z.infer<typeof returnUserSchema>
