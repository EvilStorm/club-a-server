import { IsOptional, Length, IsNumber, IsBoolean } from 'class-validator';

export class UpdateCourtDto {
  @IsOptional()
  @Length(1, 20)
  name?: string;

  @IsOptional()
  @Length(1, 200)
  location?: string;

  @IsOptional()
  @IsNumber()
  surfaceCount?: number;

  @IsOptional()
  @IsNumber()
  isOutdoor?: number;
}
