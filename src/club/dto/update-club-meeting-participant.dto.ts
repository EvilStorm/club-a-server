// src/club-meeting-participant/dto/update-club-meeting-participant.dto.ts

import { IsOptional, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { ParticipantStatus } from '../entities/club-meeting-participant.entity';

export class UpdateClubMeetingParticipantDto {
  @IsOptional()
  @IsNumber()
  clubMeetingId?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsEnum(ParticipantStatus)
  status?: ParticipantStatus;

  @IsOptional()
  @IsBoolean()
  isGuest?: boolean;

  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;
}
