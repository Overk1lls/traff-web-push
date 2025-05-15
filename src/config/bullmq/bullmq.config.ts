import { registerAs } from '@nestjs/config';
import { ConfigNamespace } from '../config.enum';

export interface RedisConfig {
  host: string;
  port: string;
}

export default registerAs<RedisConfig, () => RedisConfig>(
  ConfigNamespace.REDIS,
  () => ({
    host: process.env.REDIS_HOST!,
    port: process.env.REDIS_PORT!,
  }),
);
