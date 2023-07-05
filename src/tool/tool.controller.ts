import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectUpdateDto } from './dto/upload-dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  /** 上传文件 */
  @Permission('tool:upload')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) body: ProjectUpdateDto,
  ) {
    const result = await this.toolService.uploadFile(file, body);
    return result;
  }
}
