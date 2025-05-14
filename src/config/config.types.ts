import { AppConfig } from './app/app.config';
import { ConfigNamespace } from './config.enum';
import { VapidConfig } from './vapid/vapid.config';

export interface GlobalAppConfig {
  [ConfigNamespace.APP]: AppConfig;
  [ConfigNamespace.VAPID]: VapidConfig;
}

export interface AppEnvConfig {
  PORT: number;

  VAPID_SUBJECT: string;
  VAPID_PUBLIC_KEY: string;
  VAPID_PRIVATE_KEY: string;
}
