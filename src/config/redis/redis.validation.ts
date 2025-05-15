import Joi from 'joi';
import { AppEnvConfig } from '../config.types';

export default Joi.object<AppEnvConfig>({
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
});
