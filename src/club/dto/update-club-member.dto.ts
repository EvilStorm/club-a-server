import { IsOptional, IsNumber, IsEnum } from 'class-validator';

export class UpdateClubMemberDto {
  @IsOptional()
  @IsNumber()
  clubId?: number;

  @IsOptional()
  @IsNumber()
  member?: number; // User ID

  @IsOptional()
  @IsNumber()
  @IsEnum([1, 2, 3])
  status?: number;
}
