import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({ description: 'JWT 액세스 토큰' })
  accessToken: string;

  @ApiProperty({ description: 'JWT 리프레시 토큰' })
  refreshToken: string;
}
