import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserExtendsInfo } from './entities/user-extends-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserExtendsInfo])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
