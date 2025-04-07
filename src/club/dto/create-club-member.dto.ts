import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export class CreateClubMemberDto {
  @IsNotEmpty()
  @IsNumber()
  clubId: number;

  @IsNotEmpty()
  @IsNumber()
  member: number; // User ID

  @IsNotEmpty()
  @IsNumber()
  @IsEnum([1, 2, 3])
  status: number;
}
