import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

/** 创建项目DTO */
export class ProjectCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly ossBucket: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly ossPath: string;
}
