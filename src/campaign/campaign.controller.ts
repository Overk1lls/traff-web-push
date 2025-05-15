import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CampaignService } from './campaign.service';
import { CampaignSendBodyDto, CampaignSendResponseDto } from './dto';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a campaign to send notifications' })
  @ApiBody({
    type: CampaignSendBodyDto,
    description: 'Campaign send object/DTO',
  })
  @ApiCreatedResponse({
    type: CampaignSendResponseDto,
    description: 'Successfully sent a campaign',
  })
  @ApiBadRequestResponse({ description: 'Invalid campaign payload' })
  @ApiInternalServerErrorResponse({ description: 'Something bad happened...' })
  async send(
    @Body() body: CampaignSendBodyDto,
  ): Promise<CampaignSendResponseDto> {
    return await this.campaignService.sendCampaign(body.title, body.message);
  }
}
