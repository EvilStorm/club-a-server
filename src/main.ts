import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*', // 모든 도메인 허용 (개발 환경에서 편리)
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTION', // 허용할 HTTP 메서드
      credentials: true, // 쿠키 및 인증 헤더 허용 (필요한 경우)
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
