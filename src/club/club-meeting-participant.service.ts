import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubMeetingParticipant } from './entities/club-meeting-participant.entity';
import { CreateClubMeetingParticipantDto } from './dto/create-club-meeting-participant.dto';
import { UpdateClubMeetingParticipantDto } from './dto/update-club-meeting-participant.dto';
import { ClubMeetingService } from './club-meeting.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ClubMeetingParticipantService {
  constructor(
    @InjectRepository(ClubMeetingParticipant)
    private readonly clubMeetingParticipantRepository: Repository<ClubMeetingParticipant>,
    private readonly clubMeetingService: ClubMeetingService,
    private readonly userService: UsersService,
  ) {}

  async create(
    createClubMeetingParticipantDto: CreateClubMeetingParticipantDto,
  ): Promise<ClubMeetingParticipant> {
    const { clubMeetingId, userId, ...participantData } =
      createClubMeetingParticipantDto;

    const clubMeeting = await this.clubMeetingService.findOne(clubMeetingId);
    if (!clubMeeting) {
      throw new NotFoundException(
        `ClubMeeting with ID ${clubMeetingId} not found`,
      );
    }

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const participant = this.clubMeetingParticipantRepository.create({
      ...participantData,
      clubMeeting: clubMeeting,
      user: user,
    });

    return this.clubMeetingParticipantRepository.save(participant);
  }

  async findAll(): Promise<ClubMeetingParticipant[]> {
    return this.clubMeetingParticipantRepository.find({
      relations: ['clubMeeting', 'user'],
    });
  }

  async findOne(id: number): Promise<ClubMeetingParticipant> {
    const participant = await this.clubMeetingParticipantRepository.findOne({
      where: { id },
      relations: ['clubMeeting', 'user'],
    });
    if (!participant) {
      throw new NotFoundException(
        `ClubMeetingParticipant with ID ${id} not found`,
      );
    }
    return participant;
  }

  async findMemberList(id: number): Promise<ClubMeetingParticipant[]> {
    const participant = await this.clubMeetingParticipantRepository.find({
      where: { clubMeeting: { id } },
      relations: ['user'],
    });
    if (!participant) {
      throw new NotFoundException(
        `ClubMeetingParticipant with ID ${id} not found`,
      );
    }
    return participant;
  }

  async update(
    id: number,
    updateClubMeetingParticipantDto: UpdateClubMeetingParticipantDto,
  ): Promise<ClubMeetingParticipant> {
    const participant = await this.findOne(id);
    const { clubMeetingId, userId, ...participantData } =
      updateClubMeetingParticipantDto;

    if (clubMeetingId !== undefined) {
      const clubMeeting = await this.clubMeetingService.findOne(clubMeetingId);
      if (!clubMeeting) {
        throw new NotFoundException(
          `ClubMeeting with ID ${clubMeetingId} not found`,
        );
      }
      participant.clubMeeting = clubMeeting;
    }

    if (userId !== undefined) {
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      participant.user = user;
    }

    Object.assign(participant, participantData);

    return this.clubMeetingParticipantRepository.save(participant);
  }

  async remove(id: number): Promise<void> {
    const result = await this.clubMeetingParticipantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `ClubMeetingParticipant with ID ${id} not found`,
      );
    }
  }
}
