import { AppConfig } from './app/app.config';
import { ConfigNamespace } from './config.enum';

export interface GlobalAppConfig {
  [ConfigNamespace.APP]: AppConfig;
}

export interface AppEnvConfig {
  PORT: number;

  VAPID_EMAIL: string;
  VAPID_PUBLIC_KEY: string;
  VAPID_PRIVATE_KEY: string;
}
