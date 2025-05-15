import { Body, Controller, Post } from '@nestjs/common';
import { PushSubscriptionDto, SubscribeResponseDto } from './dto';
import { PushService } from './push.service';

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post('subscribe')
  async subscribe(
    @Body() body: PushSubscriptionDto,
  ): Promise<SubscribeResponseDto> {
    await this.pushService.subscribe(body);

    return { success: true };
  }
}
