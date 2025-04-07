import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Club } from './entities/club.entity';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { UsersService } from '../users/users.service';
import { Court } from '../court/entities/court.entity'; // Court 엔티티 import
import { In } from 'typeorm'; // In 연산자 import

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
    private readonly userService: UsersService,
    @InjectRepository(Court)
    private readonly courtRepository: Repository<Court>, // Court Repository 주입
  ) {}

  async create(createClubDto: CreateClubDto): Promise<Club> {
    const { clubLeader, activeCourts, ...clubData } = createClubDto;

    const leader = await this.userService.findOne(clubLeader);
    if (!leader) {
      throw new NotFoundException(
        `User with ID ${clubLeader} not found as club leader`,
      );
    }

    let courts: Court[] = [];
    if (activeCourts && activeCourts.length > 0) {
      courts = await this.courtRepository.findBy({ id: In(activeCourts) });
      if (courts.length !== activeCourts.length) {
        throw new NotFoundException(
          `One or more courts with provided IDs not found`,
        );
      }
    }

    const club = this.clubRepository.create({
      ...clubData,
      clubLeader: leader,
      activeCourts: courts,
    });

    return this.clubRepository.save(club);
  }

  async findAll(): Promise<Club[]> {
    return this.clubRepository.find({
      relations: ['clubLeader', 'activeCourts'],
    });
  }

  async findOne(id: number): Promise<Club> {
    const club = await this.clubRepository.findOne({
      where: { id },
      relations: ['clubLeader', 'activeCourts'],
    });
    if (!club) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
    return club;
  }

  async update(id: number, updateClubDto: UpdateClubDto): Promise<Club> {
    const club = await this.findOne(id);
    const { clubLeader, activeCourts, ...clubData } = updateClubDto;

    if (clubLeader) {
      const leader = await this.userService.findOne(clubLeader);
      if (!leader) {
        throw new NotFoundException(
          `User with ID ${clubLeader} not found as club leader`,
        );
      }
      club.clubLeader = leader;
    }

    club.name = clubData.name !== undefined ? clubData.name : club.name;
    club.description =
      clubData.description !== undefined
        ? clubData.description
        : club.description;
    club.clubEmblem =
      clubData.clubEmblem !== undefined ? clubData.clubEmblem : club.clubEmblem;

    if (activeCourts !== undefined) {
      const courts = await this.courtRepository.findBy({
        id: In(activeCourts),
      });
      if (courts.length !== activeCourts.length) {
        throw new NotFoundException(
          `One or more courts with provided IDs not found`,
        );
      }
      club.activeCourts = courts;
    }

    return this.clubRepository.save(club);
  }

  async remove(id: number): Promise<void> {
    const result = await this.clubRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
  }

  async searchByName(name: string): Promise<Club[]> {
    return this.clubRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
      relations: [],
    });
  }
}
