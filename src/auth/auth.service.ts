import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { User } from '../users/entities/user.entity';
import { UserExtendsInfo } from 'src/users/entities/user-extends-info.entity';
import { RegisterAccountDto } from './dto/register-account.dto';
import { SignInDto } from './dto/sign-in.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from './entities/refresh-token.entity';
import { ConfigService } from '@nestjs/config';
import { SignInResponse } from './entities/sign-in-response.entity';
import { TokenResponse } from './entities/token-response.entity';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly refreshTokenSecret: string;
  private readonly refreshTokenExpiresIn: string;

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserExtendsInfo)
    private readonly userExtendsInfoRepository: Repository<UserExtendsInfo>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')!;
    this.jwtExpiresIn = this.configService.get<string>('JWT_EXPIRES_IN')!;
    this.refreshTokenSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET')!;
    this.refreshTokenExpiresIn = this.configService.get<string>(
      'JWT_REFRESH_EXPIRES_IN',
    )!;
  }

  async registerAccount(
    registerAccountDto: RegisterAccountDto,
  ): Promise<Account | null> {
    const { email, loginType, serviceType } = registerAccountDto;

    // 해당 이메일을 가진 계정이 있는지 확인
    const existingAccount = await this.accountRepository.findOne({
      where: { email },
    });

    console.log(existingAccount);
    if (existingAccount) {
      // 이미 계정이 존재하면 해당 계정 정보 반환 (null 대신 기존 계정 정보 반환)
      return existingAccount;
    }

    // 계정이 없으면 새로 생성
    const newAccount = this.accountRepository.create({
      email,
      loginType,
      serviceType,
    });
    const response = await this.accountRepository.save(newAccount);

    // User 생성,
    const user = this.userRepository.create({
      accountId: response.id,
      email: response.email,
    });
    const userCursor = await this.userRepository.save(user);
    // User Extends INFO 생성.
    const userExtendsInfo = this.userExtendsInfoRepository.create({
      userId: userCursor.id,
    });
    const userExtendsInfoCursor =
      await this.userExtendsInfoRepository.save(userExtendsInfo);

    console.log(userExtendsInfoCursor);

    return response;
  }

  async siginIn(signInDto: SignInDto): Promise<SignInResponse> {
    const user = await this.findUserByEmail(signInDto.email);

    if (user) {
      return await this.login(user);
    } else {
      throw new UnauthorizedException('로그인에 실패 했습니다.');
    }
  }

  async login(user: User): Promise<SignInResponse> {
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtSecret,
      expiresIn: this.jwtExpiresIn,
    });
    const refreshToken = await this.generateRefreshToken(user);
    const responseDto = new SignInResponse();
    const tokens = new TokenResponse();

    tokens.accessToken = accessToken;
    tokens.refreshToken = refreshToken!.refreshToken;
    responseDto.tokens = tokens;
    responseDto.user = user;

    return responseDto;
  }

  async generateRefreshToken(user: User): Promise<RefreshToken | null> {
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() + parseInt(this.refreshTokenExpiresIn),
    );

    const refreshTokenEntity = this.refreshTokenRepository.create({
      user,
      refreshToken: token,
      expiresAt: expiresAt,
    });

    const searchData = await this.refreshTokenRepository.findOneBy({
      user: { id: user.id },
    });
    if (searchData) {
      await this.refreshTokenRepository.update(
        searchData.id,
        refreshTokenEntity,
      );
      return await this.refreshTokenRepository.findOneBy({
        user: { id: user.id },
      });
    } else {
      return this.refreshTokenRepository.save(refreshTokenEntity);
    }
  }

  async refreshToken(token: string): Promise<SignInResponse> {
    const refreshTokenEntity = await this.refreshTokenRepository.findOne({
      where: { refreshToken: token },
      relations: ['user'],
    });

    if (!refreshTokenEntity) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (refreshTokenEntity.expiresAt < new Date()) {
      await this.refreshTokenRepository.remove(refreshTokenEntity);
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = refreshTokenEntity.user;
    await this.refreshTokenRepository.remove(refreshTokenEntity); // One-time use

    return this.login(user); // 새로운 액세스 및 리프레시 토큰 발급
  }

  async findAccountByEmail(email: string): Promise<Account | null> {
    return this.accountRepository.findOne({ where: { email } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
