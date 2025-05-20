import { z } from "zod";
import { T } from "./utils";

export const LoginSchema = z.object({
	username: z.string().nonempty(),
	password: z.string().nonempty(),
});

export type LoginDto = T<typeof LoginSchema>;

export const LoginResponseSchema = z.object({
	token: z.string(),
});

export type LoginResponseDto = T<typeof LoginResponseSchema>;

export const MeSchema = z.object({
	id: z.number(),
	name: z.string(),
	isActive: z.boolean(),
});

export type Me = T<typeof MeSchema>;
