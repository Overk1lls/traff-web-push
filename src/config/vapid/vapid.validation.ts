import Joi from 'joi';
import { AppEnvConfig } from '../config.types';

export default Joi.object<AppEnvConfig>({
  VAPID_SUBJECT: Joi.string().uri().required(),
  VAPID_PUBLIC_KEY: Joi.string().required(),
  VAPID_PRIVATE_KEY: Joi.string().required(),
});
