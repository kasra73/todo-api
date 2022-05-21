import { DB_HOST, DB_USER, DB_PASS, DB_AUTH_SOURCE, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection =
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}` + `/${DB_DATABASE}?authSource=${DB_AUTH_SOURCE}`;
