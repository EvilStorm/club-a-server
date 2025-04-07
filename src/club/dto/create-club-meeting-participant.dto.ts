// src/club-meeting-participant/dto/create-club-meeting-participant.dto.ts

import { IsNotEmpty, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { ParticipantStatus } from '../entities/club-meeting-participant.entity';

export class CreateClubMeetingParticipantDto {
  @IsNotEmpty()
  @IsNumber()
  clubMeetingId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsEnum(ParticipantStatus)
  status: ParticipantStatus;

  @IsNotEmpty()
  @IsBoolean()
  isGuest: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isPaid: boolean;
}
