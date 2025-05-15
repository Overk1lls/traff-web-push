import { Module } from '@nestjs/common';
import { ExtendedConfigModule } from '../config/config.module';

@Module({
  imports: [ExtendedConfigModule],
})
export class SharedModule {}
