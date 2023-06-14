import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/** 更新项目DTO */
export class ProjectUpdateDto {
  @IsNotEmpty()
  @IsMongoId({
    message: '项目 ID 无效',
  })
  readonly id: string;

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
