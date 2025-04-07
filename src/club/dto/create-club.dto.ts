import {
  IsNotEmpty,
  Length,
  IsOptional,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateClubDto {
  @IsNotEmpty()
  @Length(1, 20)
  name: string;

  @IsOptional()
  @Length(1, 400)
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  clubLeader: number; // User ID

  @IsOptional()
  @IsUrl()
  clubEmblem?: string;

  @IsOptional()
  activeCourts?: number[]; // Array of Court IDs
}
