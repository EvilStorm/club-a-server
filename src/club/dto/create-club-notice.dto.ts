import { IsNotEmpty, Length, IsNumber, IsOptional } from 'class-validator';

export class CreateClubNoticeDto {
  @IsNotEmpty()
  @IsNumber()
  clubId: number;

  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsNumber()
  level?: number; // 또는 enum 타입 사용

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;
}
