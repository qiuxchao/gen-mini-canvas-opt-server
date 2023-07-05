import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [ToolController],
  providers: [ToolService],
})
export class ToolModule {}
