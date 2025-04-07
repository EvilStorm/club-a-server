import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubMeeting } from './entities/club-meeting.entity';
import { CreateClubMeetingDto } from './dto/create-club-meeting.dto';
import { UpdateClubMeetingDto } from './dto/update-club-meeting.dto';
import { ClubService } from './club.service';
import { CourtService } from '../court/court.service';

@Injectable()
export class ClubMeetingService {
  constructor(
    @InjectRepository(ClubMeeting)
    private readonly clubMeetingRepository: Repository<ClubMeeting>,
    private readonly clubService: ClubService,
    private readonly courtService: CourtService,
  ) {}

  async create(
    createClubMeetingDto: CreateClubMeetingDto,
  ): Promise<ClubMeeting> {
    const { clubId, courtId, ...meetingData } = createClubMeetingDto;

    const club = await this.clubService.findOne(clubId);
    if (!club) {
      throw new NotFoundException(`Club with ID ${clubId} not found`);
    }

    const court = await this.courtService.findOne(courtId);
    if (!court) {
      throw new NotFoundException(`Court with ID ${courtId} not found`);
    }

    const clubMeeting = this.clubMeetingRepository.create({
      ...meetingData,
      club: club,
      court: court,
    });

    return this.clubMeetingRepository.save(clubMeeting);
  }

  async findAll(): Promise<ClubMeeting[]> {
    return this.clubMeetingRepository.find({ relations: ['club', 'court'] });
  }

  async findOne(id: number): Promise<ClubMeeting> {
    const clubMeeting = await this.clubMeetingRepository.findOne({
      where: { id },
      relations: ['club', 'court'],
    });
    if (!clubMeeting) {
      throw new NotFoundException(`ClubMeeting with ID ${id} not found`);
    }
    return clubMeeting;
  }

  async update(
    id: number,
    updateClubMeetingDto: UpdateClubMeetingDto,
  ): Promise<ClubMeeting> {
    const clubMeeting = await this.findOne(id);
    const { clubId, courtId, ...meetingData } = updateClubMeetingDto;

    if (clubId !== undefined) {
      const club = await this.clubService.findOne(clubId);
      if (!club) {
        throw new NotFoundException(`Club with ID ${clubId} not found`);
      }
      clubMeeting.club = club;
    }

    if (courtId !== undefined) {
      const court = await this.courtService.findOne(courtId);
      if (!court) {
        throw new NotFoundException(`Court with ID ${courtId} not found`);
      }
      clubMeeting.court = court;
    }

    this.clubMeetingRepository.merge(clubMeeting, meetingData);
    return this.clubMeetingRepository.save(clubMeeting);
  }

  async remove(id: number): Promise<void> {
    const result = await this.clubMeetingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ClubMeeting with ID ${id} not found`);
    }
  }
}
