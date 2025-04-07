import {
  Controller,
  Post,
  Body,
  HttpStatus,
  ConflictException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import {
  ApiResponse,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Account } from './entities/account.entity';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponse } from './entities/sign-in-response.entity';
import { RefreshTokenRequestDto } from './entities/refresh-token-request.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-account')
  @HttpCode(HttpStatus.OK) // 계정이 이미 있어도 200 OK 반환
  async registerAccount(
    @Body() registerAccountDto: RegisterAccountDto,
  ): Promise<Account | null> {
    try {
      const account =
        await this.authService.registerAccount(registerAccountDto);
      return account;
    } catch (error) {
      // 다른 예외 처리 (예: 데이터베이스 오류)
      throw error;
    }
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async siginIn(@Body() signInDto: SignInDto): Promise<SignInResponse | null> {
    try {
      return await this.authService.siginIn(signInDto);
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOkResponse({ type: SignInResponse, description: '토큰 갱신 성공' })
  @ApiUnauthorizedResponse({
    description: '유효하지 않거나 만료된 리프레시 토큰',
  })
  async refreshToken(
    @Body() refreshTokenRequestDto: RefreshTokenRequestDto,
  ): Promise<SignInResponse> {
    return this.authService.refreshToken(refreshTokenRequestDto.refreshToken);
  }
}
