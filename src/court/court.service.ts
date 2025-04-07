import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Court } from './entities/court.entity';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';

@Injectable()
export class CourtService {
  constructor(
    @InjectRepository(Court)
    private readonly courtRepository: Repository<Court>,
  ) {}

  async create(createCourtDto: CreateCourtDto): Promise<Court> {
    const court = this.courtRepository.create(createCourtDto);
    return this.courtRepository.save(court);
  }

  async findAll(): Promise<Court[]> {
    return this.courtRepository.find();
  }

  async findOne(id: number): Promise<Court> {
    const court = await this.courtRepository.findOne({ where: { id } });
    if (!court) {
      throw new NotFoundException(`Court with ID ${id} not found`);
    }
    return court;
  }

  async update(id: number, updateCourtDto: UpdateCourtDto): Promise<Court> {
    const court = await this.findOne(id);
    this.courtRepository.merge(court, updateCourtDto);
    return this.courtRepository.save(court);
  }

  async remove(id: number): Promise<void> {
    const result = await this.courtRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Court with ID ${id} not found`);
    }
  }
}
