import * as process from 'node:process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  emailUrl:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_BASE_URL
      : process.env.LOCAL_BASE_URL,
  originUrl:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_BASE_URL
      : process.env.LOCAL_ORIGIN_URL,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
