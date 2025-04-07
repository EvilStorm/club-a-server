import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { LoginType, ServiceType } from '../enums/auth.enums';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsEnum(LoginType)
  loginType: LoginType;

  @IsNotEmpty()
  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
