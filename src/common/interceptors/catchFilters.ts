import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

const msgMap = {
  401: '未授权，请重新登录',
  403: '没有权限，请联系管理员',
};

/** 异常过滤器 */
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('HttpFilter catch: ', exception.getResponse());
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    response.status(200).json({
      code: status,
      data: null,
      message: msgMap[status] || exception.message || '系统繁忙，请稍后再试～',
      success: false,
      path: request.url,
    });
  }
}
