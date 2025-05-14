import Joi from 'joi';
import { AppEnvConfig } from '../config.types';

export default Joi.object<AppEnvConfig>({
  VAPID_EMAIL: Joi.string().email().required(),
  VAPID_PUBLIC_KEY: Joi.string().base64().required(),
  VAPID_PRIVATE_KEY: Joi.string().base64().required(),
});
