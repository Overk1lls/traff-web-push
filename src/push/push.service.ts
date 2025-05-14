import { Inject, Injectable, Logger } from '@nestjs/common';
import webpush from 'web-push';
import vapidConfig, { VapidConfig } from '../config/vapid/vapid.config';

@Injectable()
export class PushService {
  private readonly subscriptions: webpush.PushSubscription[] = [];
  private readonly logger = new Logger(PushService.name);

  constructor(
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
    this.subscriptions.push(subscription);
  }

  async sendNotification(title: string, message: string): Promise<void> {
    const payload = JSON.stringify({ title, message });

    this.logger.log(`Sending a notification with payload: ${payload}`);

    for (const subscription of this.subscriptions) {
      try {
        await webpush.sendNotification(subscription, payload);
      } catch (error) {
        this.logger.warn(
          `Subscription send failed: ${(error as Error).message}`,
        );
      }
    }
  }
}
