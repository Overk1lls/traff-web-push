import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { PushSubscription } from 'web-push';

export class PushSubscriptionKeysDto {
  @IsString()
  @IsNotEmpty()
  p256dh: string;

  @IsString()
  @IsNotEmpty()
  auth: string;
}

export class PushSubscriptionDto implements PushSubscription {
  @IsUrl()
  @IsNotEmpty()
  endpoint: string;

  @ValidateNested()
  @Type(() => PushSubscriptionKeysDto)
  @IsNotEmpty()
  keys: PushSubscriptionKeysDto;

  @IsNumber()
  @IsOptional()
  expirationTime?: number;
}

export class SubscribeBodyDto {
  @Type(() => PushSubscriptionDto)
  @IsNotEmpty()
  subscription: PushSubscriptionDto;
}
