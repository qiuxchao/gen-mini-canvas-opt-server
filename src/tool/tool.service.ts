import { Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';
import { uploadStreamToOSS } from 'fx-shared-node';

@Injectable()
export class ToolService {
  /** 上传文件 */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    // 将文件流转为 stream 流
    const readableStream = Readable.from(file.buffer);
    console.log('readableStream: ', readableStream);
    // 上传文件流到 OSS
    const url = await uploadStreamToOSS({
      bucketName: 'fenxiang-crm',
      ossPath: 'mini-canvas-tool/pic',
      fileName: file.originalname,
      fileStream: readableStream,
    });
    return url;
  }
}
