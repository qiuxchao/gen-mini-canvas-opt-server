import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/interceptors/response';
import { HttpFilter } from './common/interceptors/catchFilters';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 处理跨域
  app.enableCors({
    origin: [/gen-canvas-opt-code\.vercel\.app$/],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // 响应包装拦截器
  app.useGlobalInterceptors(new Response());
  // 异常过滤器
  app.useGlobalFilters(new HttpFilter());
  await app.listen(process.env.PORT || 6923);
}
bootstrap();
