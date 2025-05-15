import { Injectable } from '@nestjs/common';
import { PushService } from '../push/push.service';
import { CampaignSendResponseDto } from './dto';

@Injectable()
export class CampaignService {
  constructor(private readonly pushService: PushService) {}

  async sendCampaign(
    title: string,
    message: string,
  ): Promise<CampaignSendResponseDto> {
    await this.pushService.sendNotification(title, message);

    return { status: 'sent' };
  }
}
