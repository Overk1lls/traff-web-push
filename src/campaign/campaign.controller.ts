import { Body, Controller, Post } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignSendBodyDto, CampaignSendResponseDto } from './dto';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post('send')
  async send(
    @Body() body: CampaignSendBodyDto,
  ): Promise<CampaignSendResponseDto> {
    return await this.campaignService.sendCampaign(body.title, body.message);
  }
}
