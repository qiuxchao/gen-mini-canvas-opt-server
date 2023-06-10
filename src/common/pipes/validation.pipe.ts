import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/** DTO 验证管道 */
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value);
    console.log('Pipe DTO: ', DTO);
    const errors = await validate(DTO, {
      whitelist: true, // 过滤掉未在DTO中定义的属性
    });
    if (errors.length) {
      console.log('Pipe errors: ', errors);
      throw new HttpException(
        `参数错误：\n${errors
          .map((error) => JSON.stringify(error.constraints))
          .join('\n')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return DTO;
  }
}
