import 'dotenv/config';
export const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []