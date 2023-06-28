import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { uploadBufferToOSS } from 'oss';
import { ProjectUpdateDto } from './dto/upload-dto';

@Injectable()
export class ToolService {
  /** 上传文件 */
  async uploadFile(
    file: Express.Multer.File,
    body: ProjectUpdateDto,
  ): Promise<string> {
    const { ossBucket, ossPath, ossDomain } = body;
    try {
      // 上传文件到 OSS
      // let url = await uploadBufferToOSS({
      //   bucketName: ossBucket || '',
      //   ossPath: ossPath || '',
      //   fileName: file.originalname,
      //   buffer: file.buffer,
      // });
      // // 替换域名
      // if (ossDomain) {
      //   url = url.replace(/^https?:\/\/.*.(com|cn)/, ossDomain);
      // }
      // return url;
      return '';
    } catch (error) {
      console.log('上传失败：', error);
      throw new HttpException('上传失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
