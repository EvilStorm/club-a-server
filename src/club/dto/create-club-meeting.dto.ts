import {
  IsNotEmpty,
  IsNumber,
  Length,
  IsOptional,
  IsDate,
  IsEnum,
  Min,
} from 'class-validator';
import {
  MeetingType,
  GameType,
  MeetingStatus,
} from '../entities/club-meeting.entity';

export class CreateClubMeetingDto {
  @IsNotEmpty()
  @IsNumber()
  clubId: number;

  @IsNotEmpty()
  @IsDate()
  meetingDate: Date;

  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  courtId: number;

  @IsNotEmpty()
  @IsEnum(MeetingType)
  meetingType: MeetingType;

  @IsNotEmpty()
  @IsEnum(GameType)
  gameType: GameType;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;

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
