import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { UserPermission } from '../user.entity';
import { ObjectId } from 'typeorm';

/** 设置用户权限DTO */
export class UserPermissionDto {
  /** 用户 ID */
  @IsNotEmpty()
  @IsString()
  readonly id: ObjectId;

  /** type 1: 添加 2: 删除 */
  @IsNotEmpty()
  @IsIn([1, 2])
  readonly type: 1 | 2;

  @IsNotEmpty()
  @IsString({ each: true })
  readonly permissions: UserPermission[];
}
