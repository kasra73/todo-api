import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = `mongodb://admin:12345@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`;
