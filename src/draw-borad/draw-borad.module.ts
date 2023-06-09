import { Module } from '@nestjs/common';
import { DrawBoradService } from './draw-borad.service';
import { DrawBoradController } from './draw-borad.controller';

@Module({
  controllers: [DrawBoradController],
  providers: [DrawBoradService],
})
export class DrawBoradModule {}
