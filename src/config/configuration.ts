import { registerAs } from '@nestjs/config';
import { JwtAuthConfig } from './types/jwt-auth.config';
import { RedisConfig } from './types/redis.config';
import { PaystackConfig } from './types/paystack.config';
import { NodemailerConfig } from './types/nodemailer.config';

export const RedisConfiguration = registerAs(
  'redisConfig',
  (): RedisConfig => ({
    redisHost: process.env.REDIS_HOST,
    redisTTL: process.env.REDIS_TTL,
    redisPort: process.env.REDIS_PORT,
    redisDb: parseInt(process.env.REDIS_DB),
    cacheExpiry: Number(process.env.CACHE_TTL) || 86400,
  }),
);

export const JwtAuthConfiguration = registerAs(
  'jwtAuthConfig',
  (): JwtAuthConfig => ({
    secretKey: process.env.JWT_SECRET_KEY || 'secret',
  }),
);

export const PaystackConfiguration = registerAs(
  'paystackConfig',
  (): PaystackConfig => ({
    secretKey: process.env.PAYSTACK_SECRET_KEY,
    baseUrl: process.env.PAYSTACK_BASE_URL,
  }),
);

export const NodemailerConfiguration = registerAs(
  'nodemailerConfig',
  (): NodemailerConfig => ({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    username: process.env.NODEMAILER_USERNAME,
    password: process.env.NODEMAILER_PASSWORD,
  }),
);
