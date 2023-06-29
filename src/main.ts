import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/interceptors/response';
import { HttpFilter } from './common/interceptors/catchFilters';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 跨域
  app.enableCors();
  // 响应包装拦截器
  app.useGlobalInterceptors(new Response());
  // 异常过滤器
  app.useGlobalFilters(new HttpFilter());
  await app.listen(6923);
}
bootstrap();
