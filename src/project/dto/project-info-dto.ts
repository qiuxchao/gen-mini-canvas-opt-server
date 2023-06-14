import { IsMongoId, IsNotEmpty } from 'class-validator';

/** 获取项目详情DTO */
export class ProjectInfoDto {
  @IsNotEmpty()
  @IsMongoId({
    message: '项目 ID 无效',
  })
  readonly id: string;
}
