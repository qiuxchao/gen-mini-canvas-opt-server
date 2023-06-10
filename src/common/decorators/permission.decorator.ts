import { SetMetadata } from '@nestjs/common';
import { UserPermission } from 'src/user/user.entity';

/** 权限控制 */
export const Permission = (permission: UserPermission) =>
  SetMetadata('permission', permission);
