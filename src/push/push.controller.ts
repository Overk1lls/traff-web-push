import { Body, Controller, Post } from '@nestjs/common';
import { PushSubscription } from 'web-push';
import { SubscribeResponseDto } from './dto';
import { PushService } from './push.service';

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post('subscribe')
  subscribe(@Body() body: PushSubscription): SubscribeResponseDto {
    this.pushService.subscribe(body);

    return { success: true };
  }
}
