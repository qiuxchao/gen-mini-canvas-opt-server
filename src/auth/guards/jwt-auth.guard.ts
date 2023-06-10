import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

/** JWT 鉴权守卫（配合 @Public 装饰器使用） */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // @Public 装饰的公开路由直接放行
    if (isPublic) {
      return true;
    }
    // 执行 JWT 验证策略（./jwt.strategy.ts）
    return super.canActivate(context);
  }
}
