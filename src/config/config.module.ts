import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app/app.config';
import appValidation from './app/app.validation';
import bullmqConfig from './bullmq/bullmq.config';
import bullmqValidation from './bullmq/bullmq.validation';
import mongoConfig from './mongo/mongo.config';
import mongoValidation from './mongo/mongo.validation';
import redisConfig from './redis/redis.config';
import redisValidation from './redis/redis.validation';
import vapidConfig from './vapid/vapid.config';
import vapidValidation from './vapid/vapid.validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, bullmqConfig, mongoConfig, redisConfig, vapidConfig],
      validationSchema: appValidation
        .concat(bullmqValidation)
        .concat(mongoValidation)
        .concat(redisValidation)
        .concat(vapidValidation),
    }),
  ],
})
export class ExtendedConfigModule {}
