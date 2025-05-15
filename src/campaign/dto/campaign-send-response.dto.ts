export type CampaignResponseStatus = 'sent' | 'error';

export class CampaignSendResponseDto {
  status: CampaignResponseStatus;
}
