import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { UsersService } from './users.service';

import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserExtendsInfoDto } from './dto/update-user-extends-info.dto';
import { UserExtendsInfo } from './entities/user-extends-info.entity';

interface RequestWithUser extends Request {
  user: { id: number; email: string } | User; // 요청 객체에 담기는 user 타입 정의 (선택 사항)
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: RequestWithUser): Promise<User | null> {
    console.log('Authenticated User:', req.user);

    try {
      return await this.usersService.getUserInfo(req.user.id);
    } catch (error) {
      // 다른 예외 처리 (예: 데이터베이스 오류)
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @ApiBody({ type: UpdateUserDto, description: '업데이트할 사용자 정보' })
  @ApiOkResponse({ type: User, description: '사용자 정보 업데이트 성공' })
  @ApiUnauthorizedResponse({ description: '유효하지 않은 토큰' })
  @ApiNotFoundResponse({ description: '사용자를 찾을 수 없음' })
  async updateProfile(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(req.user.id, updateUserDto); // JWT payload의 id 사용
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/extends')
  @ApiBody({ type: UpdateUserDto, description: '업데이트할 사용자 정보' })
  @ApiOkResponse({ type: User, description: '사용자 정보 업데이트 성공' })
  @ApiUnauthorizedResponse({ description: '유효하지 않은 토큰' })
  @ApiNotFoundResponse({ description: '사용자를 찾을 수 없음' })
  async updateExtendsProfile(
    @Request() req: RequestWithUser,
    @Body() updateUserExtendsInfoDto: UpdateUserExtendsInfoDto,
  ): Promise<UserExtendsInfo> {
    return this.usersService.updateExtendsInfo(
      req.user.id,
      updateUserExtendsInfoDto,
    ); // JWT payload의 id 사용
  }
}
