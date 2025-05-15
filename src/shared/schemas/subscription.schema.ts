import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PushSubscriptionKeysDto } from '../../push/dto';

@Schema()
export class Subscription {
  @Prop({ required: true })
  endpoint: string;

  @Prop({
    required: true,
    type: {
      p256dh: {
        type: String,
        required: true,
      },
      auth: {
        type: String,
        required: true,
      },
    },
  })
  keys: PushSubscriptionKeysDto;
}

export type SubscriptionDocument = Subscription &
  Document<string, any, Subscription>;
export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
