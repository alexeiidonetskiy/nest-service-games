import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { LocalizationController } from './localization.controller';

@Module({
  providers: [LocalizationService],
  controllers: [LocalizationController],
})
export class LocalizationModule {}
