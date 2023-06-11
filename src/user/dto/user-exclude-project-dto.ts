import { IsIn, IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'typeorm';

/** 设置用户不拥有的项目DTO */
export class UserExcludeProjectDto {
  /** 用户 ID */
  @IsNotEmpty()
  @IsMongoId()
  readonly id: ObjectId;

  /** type 1: 添加 2: 删除 */
  @IsNotEmpty()
  @IsIn([1, 2])
  readonly type: 1 | 2;

  @IsNotEmpty()
  @IsMongoId({ each: true })
  readonly excludeProjects: string[];
}
