import { IsMongoId, IsNotEmpty } from 'class-validator';

/** 删除项目DTO */
export class ProjectDeleteDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  readonly ids: string[];
}
