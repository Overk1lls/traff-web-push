import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app/app.config';
import appValidation from './app/app.validation';
import vapidConfig from './vapid/vapid.config';
import vapidValidation from './vapid/vapid.validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, vapidConfig],
      validationSchema: appValidation.concat(vapidValidation),
    }),
  ],
})
export class ExtendedConfigModule {}
