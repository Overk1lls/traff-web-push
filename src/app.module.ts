import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignModule } from './campaign/campaign.module';
import { GlobalAppConfig } from './config/config.types';
import { PushModule } from './push/push.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService<GlobalAppConfig, true>) => ({
        connection: {
          host: configService.get('bullmq.host', { infer: true }),
          port: configService.get('bullmq.port', { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<GlobalAppConfig, true>) => ({
        uri: configService.get('mongo.url', { infer: true }),
      }),
      inject: [ConfigService],
    }),
    PushModule,
    CampaignModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
