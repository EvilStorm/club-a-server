import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ description: '리프레시 토큰' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
