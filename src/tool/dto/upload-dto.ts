import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/** 上传文件DTO */
export class ProjectUpdateDto {
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
