import { registerAs } from '@nestjs/config';
import { ConfigNamespace } from '../config.enum';

export interface MongoConfig {
  url: string;
}

export default registerAs<MongoConfig, () => MongoConfig>(
  ConfigNamespace.MONGO,
  () => ({
    url: process.env.MONGO_URL!,
  }),
);
