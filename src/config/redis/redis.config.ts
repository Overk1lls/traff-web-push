import { registerAs } from '@nestjs/config';
import { ConfigNamespace } from '../config.enum';

export interface BullMqConfig {
  host: string;
  port: string;
}

export default registerAs<BullMqConfig, () => BullMqConfig>(
  ConfigNamespace.BULLMQ,
  () => ({
    host: process.env.BULLMQ_HOST!,
    port: process.env.BULLMQ_PORT!,
  }),
);
