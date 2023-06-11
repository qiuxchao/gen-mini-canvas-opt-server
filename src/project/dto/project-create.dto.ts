import { IsNotEmpty, IsString } from 'class-validator';

/** 创建项目DTO */
export class ProjectCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
