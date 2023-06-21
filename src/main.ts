import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundErrorFilter } from './entity-not-found-error.filter';
import { useContainer } from 'class-validator';

async function bootstrap() {
  //使用Nestjs的工厂函数创建app
  const app = await NestFactory.create(AppModule);
  //使用全局管道添加，然后所有的DTO 可以通过引入class-validator 中的装饰器来进行验证，如果有错误就会抛出错误
  app.useGlobalPipes(new ValidationPipe());
  //全局的异常处理添加
  app.useGlobalFilters(new EntityNotFoundErrorFilter());
  //自定义容器 告诉 class-validator 如果有错误使用默认容器来处理
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
