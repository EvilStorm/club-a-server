import { Module } from '@nestjs/common';
import { DbconService } from './dbcon.service';
import { DbconController } from './dbcon.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // DataSource 사용을 위해 필요
@Module({
  providers: [DbconService],
  controllers: [DbconController],
})
export class DbconModule {}
