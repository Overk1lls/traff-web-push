import { AppConfig } from './app/app.config';
import { RedisConfig } from './bullmq/bullmq.config';
import { ConfigNamespace } from './config.enum';
import { MongoConfig } from './mongo/mongo.config';
import { VapidConfig } from './vapid/vapid.config';

export interface GlobalAppConfig {
  [ConfigNamespace.APP]: AppConfig;
  [ConfigNamespace.BULLMQ]: RedisConfig;
  [ConfigNamespace.MONGO]: MongoConfig;
  [ConfigNamespace.REDIS]: RedisConfig;
  [ConfigNamespace.VAPID]: VapidConfig;
}

export interface AppEnvConfig {
  PORT: number;

  VAPID_SUBJECT: string;
  VAPID_PUBLIC_KEY: string;
  VAPID_PRIVATE_KEY: string;

  REDIS_HOST: string;
  REDIS_PORT: string;

  BULLMQ_HOST: string;
  BULLMQ_PORT: string;

  MONGO_URL: string;
}
