import { IsNotEmpty, IsString } from 'class-validator';

export class CampaignSendBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
