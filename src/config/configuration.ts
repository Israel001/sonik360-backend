import { registerAs } from '@nestjs/config';
import { JwtAuthConfig } from './types/jwt-auth.config';
import { RedisConfig } from './types/redis.config';

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
    secretKey: process.env.JWT_SECRET_KEY || 'secret'
  })
)
