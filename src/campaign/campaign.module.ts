import { Module } from '@nestjs/common';
import { PushModule } from '../push/push.module';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';

@Module({
  imports: [PushModule],
  providers: [CampaignService],
  controllers: [CampaignController],
})
export class CampaignModule {}
