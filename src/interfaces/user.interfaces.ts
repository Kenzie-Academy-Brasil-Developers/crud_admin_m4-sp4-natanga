import { z } from "zod";
import { UserSchema, ensureDataIsValid, returnUserSchema } from './../schemas/user.schema';

export type tUser = z.infer<typeof UserSchema>

export type tCreateUserRequest = z.infer<typeof ensureDataIsValid>

export type tUserWithoutPassword = z.infer<typeof returnUserSchema>
