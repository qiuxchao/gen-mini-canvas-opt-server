import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/interceptors/response';
import { HttpFilter } from './common/interceptors/catchFilters';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 处理跨域
  // app.enableCors({
  //   // origin: 'https://gen-canvas-opt-code.vercel.app',
  //   origin: '*',
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //   allowedHeaders:
  //     'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma, Authorization',
  // });
  app.enableCors();
  // 响应包装拦截器
  app.useGlobalInterceptors(new Response());
  // 异常过滤器
  app.useGlobalFilters(new HttpFilter());
  await app.listen(process.env.PORT || 6923);
}
bootstrap();
