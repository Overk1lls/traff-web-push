import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import webpush from 'web-push';
import { PushPayload } from './interfaces';
import { PUSH_QUEUE_NAME } from './push.constants';

@Processor(PUSH_QUEUE_NAME)
export class PushConsumer extends WorkerHost {
  private readonly logger = new Logger(PushConsumer.name);

  async process(job: Job<PushPayload>): Promise<void> {
    const { message, title, subscription } = job.data;
    const payload = JSON.stringify({ title, message });

    this.logger.log(`Sending a notification with payload: ${payload}`);

    try {
      await webpush.sendNotification(subscription, payload);
    } catch (error) {
      this.logger.warn(`Subscription send failed: ${(error as Error).message}`);
    }
  }
}
