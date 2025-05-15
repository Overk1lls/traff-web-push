import Joi from 'joi';
import { AppEnvConfig } from '../config.types';

export default Joi.object<AppEnvConfig>({
  BULLMQ_HOST: Joi.string().required(),
  BULLMQ_PORT: Joi.number().required(),
});
