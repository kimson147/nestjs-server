import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@/app/index';
import { ClassSerializerInterceptor } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const PORT = +configService.get<number>('PORT');

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(PORT);
}
bootstrap();
