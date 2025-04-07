import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { LoginType, ServiceType } from '../enums/auth.enums';

@Entity({ schema: 'dev_club_a', name: 'account' }) // 스키마 및 테이블 이름 설정 (필요에 따라)
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: LoginType,
    default: LoginType.EMAIL,
    name: 'login_type',
  })
  loginType: LoginType;

  @Column({
    type: 'enum',
    enum: ServiceType,
    default: ServiceType.TENIFO,
    name: 'service_type',
  }) // 기본값 설정
  serviceType: ServiceType;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;
}
