import { registerAs } from '@nestjs/config';
import { ConfigNamespace } from '../config.enum';

export interface VapidConfig {
  vapidEmail: string;
  vapidPublicKey: string;
  vapidPrivateKey: string;
}

export default registerAs<VapidConfig, () => VapidConfig>(
  ConfigNamespace.APP,
  () => ({
    vapidEmail: process.env.VAPID_EMAIL!,
    vapidPublicKey: process.env.VAPID_PUBLIC_KEY!,
    vapidPrivateKey: process.env.VAPID_PRIVATE_KEY!,
  }),
);
