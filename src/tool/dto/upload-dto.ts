import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Express } from 'express';

/** 上传文件DTO */
export class ProjectUpdateDto {
  @IsNotEmpty()
  readonly file: Express.Multer.File;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly ossBucket: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly ossPath: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly ossDomain: string;
}
