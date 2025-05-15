import Joi from 'joi';
import { AppEnvConfig } from '../config.types';

export default Joi.object<AppEnvConfig>({
  MONGO_URL: Joi.string().uri().required(),
});
