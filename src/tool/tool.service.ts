import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';
import { uploadStreamToOSS } from 'fx-shared-node';
import { ProjectUpdateDto } from './dto/upload-dto';

@Injectable()
export class ToolService {
  /** 上传文件 */
  async uploadFile(
    file: Express.Multer.File,
    body: ProjectUpdateDto,
  ): Promise<string> {
    const { ossBucket, ossPath, ossDomain } = body;
    // 将文件流转为 stream 流
    const readableStream = Readable.from(file.buffer);
    try {
      // 上传文件流到 OSS
      let url = await uploadStreamToOSS({
        bucketName: ossBucket || 'fenxiang-crm',
        ossPath: ossPath || 'mini-canvas-tool/pic',
        fileName: file.originalname,
        fileStream: readableStream,
      });
      // 替换域名
      if (ossDomain) {
        url = url.replace(/^https?:\/\/.*.(com|cn)/, ossDomain);
      }
      return url;
    } catch (error) {
      console.log('上传失败：', error);
      throw new HttpException('上传失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
