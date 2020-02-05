import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  env:  process.env.NODE_ENV,
  dataBaseUrl: process.env.DATABASE_URL,
}