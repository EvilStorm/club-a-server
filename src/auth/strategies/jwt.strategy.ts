import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service'; // 사용자 정보 조회를 위한 서비스 (선택 사항)

interface JwtPayload {
  sub: number; // 사용자 ID (일반적으로 sub 클레임에 저장)
  email: string;
  // 다른 사용자 정보 클레임들
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService, // 선택 사항
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 토큰 만료 여부 검사
      secretOrKey: configService.get<string>('JWT_SECRET'), // JWT 시크릿 키
    });
  }

  async validate(payload: JwtPayload) {
    // payload에는 토큰의 내용이 담겨 있습니다.
    // 여기에서 payload를 기반으로 실제 사용자 정보를 데이터베이스에서 조회할 수 있습니다 (선택 사항).
    // 예를 들어, payload.sub (사용자 ID)를 이용하여 User 엔티티를 찾을 수 있습니다.

    // const user = await this.authService.findById(payload.sub);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;

    // 또는 단순히 payload 자체를 반환하여 Guard에서 접근할 수 있도록 할 수 있습니다.
    return { id: payload.sub, email: payload.email }; // 요청 객체에 담길 사용자 정보
  }
}
