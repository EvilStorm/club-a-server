import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DbconModule } from './dbcon/dbcon.module';
import { AuthModule } from './auth/auth.module';
import { CorsMiddleware } from './common/middleware/cors.middleware';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { CourtModule } from './court/court.module';
import { ClubModule } from './club/club.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 사용
      envFilePath: '.env', // 환경 변수 파일 경로 (기본값)
    }),
    DatabaseModule,
    DbconModule,
    AuthModule,
    UsersModule,
    CourtModule,
    ClubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*'); // 모든 라우트에 적용하거나 특정 라우트에 적용
  }
}
