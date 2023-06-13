import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  /** 上传文件 */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.toolService.uploadFile(file);
    return result;
  }
}
