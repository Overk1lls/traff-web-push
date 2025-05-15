import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignModule } from './campaign/campaign.module';
import { ExtendedConfigModule } from './config/config.module';
import { PushModule } from './push/push.module';

@Module({
  imports: [ExtendedConfigModule, PushModule, CampaignModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
