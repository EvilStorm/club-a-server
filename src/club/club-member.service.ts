import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubMember } from './entities/club-member.entity';
import { CreateClubMemberDto } from './dto/create-club-member.dto';
import { UpdateClubMemberDto } from './dto/update-club-member.dto';
import { ClubService } from '../club/club.service'; // ClubService import
import { UsersService } from '../users/users.service'; // UserService import
import { Club } from './entities/club.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ClubMemberService {
  constructor(
    @InjectRepository(ClubMember)
    private readonly clubMemberRepository: Repository<ClubMember>,
    private readonly clubService: ClubService, // ClubService 주입
    private readonly userService: UsersService, // UserService 주입
  ) {}

  async create(createClubMemberDto: CreateClubMemberDto): Promise<ClubMember> {
    const { clubId, member, status } = createClubMemberDto;

    const club = await this.clubService.findOne(clubId);
    if (!club) {
      throw new NotFoundException(`Club with ID ${clubId} not found`);
    }

    const user = await this.userService.findOne(member);
    if (!user) {
      throw new NotFoundException(`User with ID ${member} not found`);
    }

    const clubMember = this.clubMemberRepository.create({
      club: club,
      member: user,
      status,
    });

    return this.clubMemberRepository.save(clubMember);
  }

  async findAll(): Promise<ClubMember[]> {
    return this.clubMemberRepository.find({ relations: ['club', 'member'] });
  }

  async findOne(id: number): Promise<ClubMember> {
    const clubMember = await this.clubMemberRepository.findOne({
      where: { id },
      relations: ['club', 'member'],
    });
    if (!clubMember) {
      throw new NotFoundException(`ClubMember with ID ${id} not found`);
    }
    return clubMember;
  }

  async update(
    id: number,
    updateClubMemberDto: UpdateClubMemberDto,
  ): Promise<ClubMember> {
    const clubMember = await this.findOne(id);
    const { clubId, member, status } = updateClubMemberDto;

    if (clubId !== undefined) {
      const club = await this.clubService.findOne(clubId);
      if (!club) {
        throw new NotFoundException(`Club with ID ${clubId} not found`);
      }
      clubMember.club = club;
    }

    if (member !== undefined) {
      const user = await this.userService.findOne(member);
      if (!user) {
        throw new NotFoundException(`User with ID ${member} not found`);
      }
      clubMember.member = user;
    }

    if (status !== undefined) {
      clubMember.status = status;
    }

    return this.clubMemberRepository.save(clubMember);
  }

  async remove(id: number): Promise<void> {
    const result = await this.clubMemberRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ClubMember with ID ${id} not found`);
    }
  }
}
