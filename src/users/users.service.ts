import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserExtendsInfoDto } from './dto/update-user-extends-info.dto';
import { UserExtendsInfo } from './entities/user-extends-info.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserExtendsInfo)
    private readonly userExtendsInfoRepository: Repository<UserExtendsInfo>,
  ) {}

  async getUserInfo(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(userId); // 먼저 업데이트할 사용자 존재 여부 확인
    Object.assign(user, updateUserDto); // DTO의 내용을 사용자 엔티티에 병합
    return this.userRepository.save(user); // 변경된 사용자 정보 저장 및 반환
  }

  async updateExtendsInfo(
    userId: number,
    updateUserExtendsInfoDto: UpdateUserExtendsInfoDto,
  ): Promise<UserExtendsInfo> {
    const extendsInfo = await this.findOneExtends(userId); // 먼저 업데이트할 사용자 존재 여부 확인
    Object.assign(extendsInfo, updateUserExtendsInfoDto); // DTO의 내용을 사용자 엔티티에 병합
    return this.userExtendsInfoRepository.save(extendsInfo); // 변경된 사용자 정보 저장 및 반환
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`사용자 정보를 찾을 수 없습니다.`);
    }
    return user;
  }

  async findOneExtends(userId: number): Promise<UserExtendsInfo> {
    const extendsInfo = await this.userExtendsInfoRepository.findOne({
      where: { userId },
    });
    if (!extendsInfo) {
      throw new NotFoundException(`사용자 정보를 찾을 수 없습니다.`);
    }
    return extendsInfo;
  }
}
