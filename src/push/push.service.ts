import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import webpush from 'web-push';
import { CampaignSendBodyDto } from '../campaign/dto';
import vapidConfig, { VapidConfig } from '../config/vapid/vapid.config';
import { PUSH_QUEUE_NAME } from './push.constants';
import { PushQueueJob } from './push.enum';

@Injectable()
export class PushService {
  private readonly subscriptions: webpush.PushSubscription[] = [];
  private readonly logger = new Logger(PushService.name);

  constructor(
    @InjectQueue(PUSH_QUEUE_NAME)
    private readonly queue: Queue,

    @Inject(vapidConfig.KEY)
    private readonly vapidConfig: VapidConfig,
  ) {
    webpush.setVapidDetails(
      this.vapidConfig.vapidEmail,
      this.vapidConfig.vapidPublicKey,
      this.vapidConfig.vapidPrivateKey,
    );
  }

  subscribe(subscription: webpush.PushSubscription): void {
    this.logger.log(`Subscription incoming: ${subscription.keys.auth}`);

    this.subscriptions.push(subscription);
  }

  async sendNotification(dto: CampaignSendBodyDto): Promise<void> {
    this.logger.log(`Queueing notifications: ${JSON.stringify(dto)}`);

    for (const subscription of this.subscriptions) {
      await this.queue.add(PushQueueJob.PUSH, { ...dto, subscription });
    }
  }
}
