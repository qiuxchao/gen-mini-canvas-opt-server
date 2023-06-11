import { IsMongoId, IsNotEmpty } from 'class-validator';

/** 删除项目DTO */
export class ProjectDeleteDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'ID有误', each: true })
  readonly ids: string[];
}
