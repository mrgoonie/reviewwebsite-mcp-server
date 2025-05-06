import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

export const envSchema = z.object({
	REVIEWWEBSITE_ACCESS_KEY: z.string(),
});
export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
