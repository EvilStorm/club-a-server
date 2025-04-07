import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubNotice } from './entities/club-notice.entity';
import { CreateClubNoticeDto } from './dto/create-club-notice.dto';
import { UpdateClubNoticeDto } from './dto/update-club-notice.dto';
import { ClubService } from '../club/club.service'; // ClubService import
import { Club } from './entities/club.entity';

@Injectable()
export class ClubNoticeService {
  constructor(
    @InjectRepository(ClubNotice)
    private readonly clubNoticeRepository: Repository<ClubNotice>,
    private readonly clubService: ClubService, // ClubService 주입
  ) {}

  async create(createClubNoticeDto: CreateClubNoticeDto): Promise<ClubNotice> {
    const { clubId, ...noticeData } = createClubNoticeDto;

    const club = await this.clubService.findOne(clubId);
    if (!club) {
      throw new NotFoundException(`Club with ID ${clubId} not found`);
    }

    const clubNotice = this.clubNoticeRepository.create({
      ...noticeData,
      club: club,
    });

    return this.clubNoticeRepository.save(clubNotice);
  }

  async findAll(): Promise<ClubNotice[]> {
    return this.clubNoticeRepository.find({ relations: ['club'] });
  }

  async findOne(id: number): Promise<ClubNotice> {
    const clubNotice = await this.clubNoticeRepository.findOne({
      where: { id },
      relations: ['club'],
    });
    if (!clubNotice) {
      throw new NotFoundException(`ClubNotice with ID ${id} not found`);
    }
    return clubNotice;
  }

  async update(
    id: number,
    updateClubNoticeDto: UpdateClubNoticeDto,
  ): Promise<ClubNotice> {
    const clubNotice = await this.findOne(id);
    const { clubId, ...noticeData } = updateClubNoticeDto;

    if (clubId !== undefined) {
      const club = await this.clubService.findOne(clubId);
      if (!club) {
        throw new NotFoundException(`Club with ID ${clubId} not found`);
      }
      clubNotice.club = club;
    }

    this.clubNoticeRepository.merge(clubNotice, noticeData);
    return this.clubNoticeRepository.save(clubNotice);
  }

  async remove(id: number): Promise<void> {
    const result = await this.clubNoticeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ClubNotice with ID ${id} not found`);
    }
  }
}
