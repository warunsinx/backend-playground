import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres' as const,
    host: process.env.POSTGRES_HOST || '',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || '',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*.js'],
    synchronize: process.env.SYNCHRONIZE === 'true' ? true : false,
    logging: false,
  },
  redis: {
    socket: {
      host: process.env.REDIS_HOST || '',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
    password: process.env.REDIS_PASSWORD || '',
    ttl: Number(process.env.REDIS_TTL) || 0,
  },
});
