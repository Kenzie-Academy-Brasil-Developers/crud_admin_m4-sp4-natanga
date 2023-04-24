import { z } from 'zod'
import { hashSync } from "bcryptjs"

export const UserSchema = z.object({
    id: z.number(),
    name: z.string().min(3).max(20),
    email: z.string().email().min(5).max(120),
    password: z.string().max(120).transform((pass) => {
        return hashSync(pass, 10)
    }),
    admin: z.optional(z.boolean()),
    active: z.boolean()
})

export const ensureDataIsValid = z.object({
    name:z.string().max(20),
    email:z.string().max(100).email(),
    password:z.string().max(120),
    admin:z.boolean().optional(),
    active:z.boolean().optional(),
})

export const UserUpdateSchema = z.object({
    name: z.optional(z.string().min(3).max(20),),
    email: z.optional(z.string().email().min(5).max(120)),
    password: z.optional(z.string().max(120).transform((pass) => {
        return hashSync(pass, 10)
    })),
})

export const returnUserSchema = UserSchema.omit({ password: true })


