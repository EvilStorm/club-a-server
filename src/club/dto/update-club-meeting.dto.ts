import {
  IsOptional,
  IsNumber,
  Length,
  IsDate,
  IsEnum,
  Min,
} from 'class-validator';
import {
  MeetingType,
  GameType,
  MeetingStatus,
} from '../entities/club-meeting.entity';

export class UpdateClubMeetingDto {
  @IsOptional()
  @IsNumber()
  clubId?: number;

  @IsOptional()
  @IsDate()
  meetingDate?: Date;

  @IsOptional()
  @Length(1, 100)
  title?: string;

  @IsOptional()
  @IsNumber()
  courtId?: number;

  @IsOptional()
  @IsEnum(MeetingType)
  meetingType?: MeetingType;

  @IsOptional()
  @IsEnum(GameType)
  gameType?: GameType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsEnum(MeetingStatus)
  status?: MeetingStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @IsOptional()
  @Length(1, 50)
  depositAccount?: string;

  @IsOptional()
  allowGuest?: boolean;
}
