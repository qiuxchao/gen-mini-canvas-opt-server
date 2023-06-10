import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/** 权限守卫（配合 @Permission 装饰器使用） */
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { permissions = [] } = context.switchToHttp().getRequest().user || {};
    const permission = this.reflector.getAllAndOverride<string>('permission', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!permission) {
      return true;
    }
    console.log('Need Permission: ', permission, permissions);
    return permissions.includes(permission);
  }
}
