import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ProjectUpdateDto } from './dto/upload-dto';
import { HttpService } from '@nestjs/axios';
import { type AxiosError } from 'axios';

@Injectable()
export class ToolService {
  constructor(private readonly httpService: HttpService) {}

  /** 上传文件 */
  async uploadFile(
    file: Express.Multer.File,
    body: ProjectUpdateDto,
  ): Promise<string> {
    const { ossBucket, ossPath, ossDomain } = body;
    const token = process.env.UPLOAD_TOKEN;
    const url = process.env.UPLOAD_URL;
    const path = `${ossBucket}/${ossPath}/${file.originalname}`.replace(
      /\/\//,
      '/',
    );
    console.log(token, url, path);
    try {
      // 上传文件到 OSS
      const result = await firstValueFrom<{
        data: {
          fileID: string;
        };
      }>(
        this.httpService
          .post(url, {
            token,
            path,
            buffer: file.buffer,
          })
          .pipe(
            catchError((error: AxiosError) => {
              throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
      );
      console.log('上传成功：', result.data);
      return result.data.fileID;
    } catch (error) {
      console.log('上传失败：', error);
      throw new HttpException('上传失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
