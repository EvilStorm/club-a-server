import {
  IsOptional,
  IsString,
  MaxLength,
  IsDate,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UpdateUserExtendsInfoDto {
  @IsOptional()
  @IsDate()
  staredAt?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2) // 예시: 1: 오른손, 2: 왼손
  hands?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(15)
  ntr?: number;
}
