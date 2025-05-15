import { InjectQueue } from '@nestjs/bullmq';
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bullmq';
import { Model } from 'mongoose';
import webpush from 'web-push';
import { CampaignSendBodyDto } from '../campaign/dto';
import vapidConfig, { VapidConfig } from '../config/vapid/vapid.config';
import { Subscription, SubscriptionDocument } from '../shared/schemas';
import { PushPayload } from './interfaces';
import { PUSH_QUEUE_NAME } from './push.constants';
import { PushQueueJob } from './push.enum';

@Injectable()
export class PushService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PushService.name);

  constructor(
    @InjectQueue(PUSH_QUEUE_NAME)
    private readonly queue: Queue<PushPayload, void, PushQueueJob>,

    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,

    @Inject(vapidConfig.KEY)
    private readonly vapidConfig: VapidConfig,
  ) {}

  onModuleInit() {
    webpush.setVapidDetails(
      this.vapidConfig.vapidEmail,
      this.vapidConfig.vapidPublicKey,
      this.vapidConfig.vapidPrivateKey,
    );
  }

  async onModuleDestroy(): Promise<void> {
    await this.queue.close();
  }

  async subscribe(subscription: webpush.PushSubscription): Promise<void> {
    this.logger.log(`Subscription incoming: ${subscription.keys.auth}`);

    await this.subscriptionModel.updateOne(
      { endpoint: subscription.endpoint },
      subscription,
      { upsert: true },
    );
  }

  async sendNotification(dto: CampaignSendBodyDto): Promise<void> {
    this.logger.log(`Queueing notifications: ${JSON.stringify(dto)}`);

    const subscriptions = await this.subscriptionModel.find();

    for (const subscription of subscriptions) {
      await this.queue.add(PushQueueJob.PUSH, {
        ...dto,
        subscription: subscription.toObject(),
      });
    }
  }
}
