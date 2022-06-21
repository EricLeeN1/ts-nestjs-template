import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import { HttpExecptionFilter } from './filters/http-execption.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { uploadStaticSrc } from './config/upload/upload.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 跨域资源共享 (CORS) 是一种允许从另一个域请求资源的机制。
  app.enableCors();
  // Helmet可以通过适当设置 HTTP 标头来帮助保护您的应用免受一些众所周知的 Web 漏洞的影响。通常，Helmet 只是 14 个设置与安全相关的 HTTP 标头的较小中间件函数的集合
  app.use(helmet());
  // CSRF 保护
  // 跨站点请求伪造（也称为 CSRF 或 XSRF）是一种对网站的恶意利用，其中从 Web 应用程序信任的用户传输未经授权的命令。为了减轻这种攻击，您可以使用csurf包。
  app.use(csurf());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExecptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useStaticAssets(join(__dirname, '..', 'upload'), {
    prefix: uploadStaticSrc,
  });

  const options = new DocumentBuilder()
    .setTitle('hanlinhui-serve')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-doc', app, document);

  await app.listen(3000);
}
bootstrap();
