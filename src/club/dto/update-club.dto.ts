import { IsOptional, Length, IsNumber, IsUrl } from 'class-validator';

export class UpdateClubDto {
  @IsOptional()
  @Length(1, 20)
  name?: string;

  @IsOptional()
  @Length(1, 400)
  description?: string;

  @IsOptional()
  @IsNumber()
  clubLeader?: number; // User ID

  @IsOptional()
  @IsUrl()
  clubEmblem?: string;

  @IsOptional()
  activeCourts?: number[]; // Array of Court IDs
}
