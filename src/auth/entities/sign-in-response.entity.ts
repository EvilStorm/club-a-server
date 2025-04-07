import { ApiProperty } from '@nestjs/swagger';
import { TokenResponse } from './token-response.entity';
import { User } from '../../users/entities/user.entity';

export class SignInResponse {
  @ApiProperty({ description: 'JWT 토큰 정보' })
  tokens: TokenResponse;
  @ApiProperty({ type: User, description: '사용자 정보' })
  user: User;
}
