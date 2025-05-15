import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { PUSH_QUEUE_NAME } from './push.constants';
import { PushConsumer } from './push.consumer';
import { PushController } from './push.controller';
import { PushService } from './push.service';

@Module({
  imports: [BullModule.registerQueue({ name: PUSH_QUEUE_NAME })],
  providers: [PushService, PushConsumer],
  controllers: [PushController],
  exports: [PushService],
})
export class PushModule {}
