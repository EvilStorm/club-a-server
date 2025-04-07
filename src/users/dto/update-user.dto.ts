import {
  IsOptional,
  IsString,
  MaxLength,
  IsDate,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(10)
  name?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsDate()
  birthdayDate?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2) // 예시: 1: 남성, 2: 여성
  gender?: number;

  // 추가적으로 업데이트 가능한 필드에 대한 유효성 검증 규칙을 정의합니다.
}
