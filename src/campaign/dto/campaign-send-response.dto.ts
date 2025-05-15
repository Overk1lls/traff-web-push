export type CampaignResponseStatus = 'sent' | 'error';

export interface CampaignSendResponseDto {
  status: CampaignResponseStatus;
}
