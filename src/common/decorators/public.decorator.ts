import { SetMetadata } from '@nestjs/common';

/** 路由公开标识 */
export const IS_PUBLIC_KEY = 'isPublic';
/** 路由公开装饰器 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
