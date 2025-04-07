import { IsOptional, Length, IsNumber, IsBoolean } from 'class-validator';

export class UpdateClubNoticeDto {
  @IsOptional()
  @IsNumber()
  clubId?: number;

  @IsOptional()
  @Length(1, 100)
  title?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  @IsNumber()
  level?: number; // 또는 enum 타입 사용

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;
}
