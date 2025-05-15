import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtendedConfigModule } from './config/config.module';
import { PushModule } from './push/push.module';

@Module({
  imports: [ExtendedConfigModule, PushModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
