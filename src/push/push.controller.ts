import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PushSubscriptionDto, SubscribeResponseDto } from './dto';
import { PushService } from './push.service';

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to push notifications' })
  @ApiBody({
    type: PushSubscriptionDto,
    description: 'Push subscription object/DTO',
  })
  @ApiCreatedResponse({
    type: SubscribeResponseDto,
    description: 'Successfully subscribed to push notifications',
  })
  @ApiBadRequestResponse({ description: 'Invalid subscription payload' })
  @ApiInternalServerErrorResponse({ description: 'Something bad happened...' })
  async subscribe(
    @Body() body: PushSubscriptionDto,
  ): Promise<SubscribeResponseDto> {
    await this.pushService.subscribe(body);

    return { success: true };
  }
}
