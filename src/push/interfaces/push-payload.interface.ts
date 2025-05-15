import { CampaignSendBodyDto } from '../../campaign/dto';
import { SubscribeBodyDto } from '../dto';

export interface PushPayload extends CampaignSendBodyDto, SubscribeBodyDto {}
