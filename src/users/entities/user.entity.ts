import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Account } from '../../auth/entities/account.entity';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
import { UserExtendsInfo } from './user-extends-info.entity';
import { Club } from '../../club/entities/club.entity';
import { ClubMember } from '../../club/entities/club-member.entity';
import { ClubMeetingParticipant } from '../../club/entities/club-meeting-participant.entity';

@Entity({ schema: 'dev_club_a', name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Account, {
    onDelete: 'CASCADE',
    // eager: true
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToOne(() => UserExtendsInfo, (extendsInfo) => extendsInfo.user, {
    cascade: true, // User 생성 시 UserExtendsInfo 도 함께 생성/업데이트/삭제
    eager: true,
  })
  extendsInfo: UserExtendsInfo;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Club, (club) => club.clubLeader)
  ownedClubs: Club[];

  @OneToMany(() => ClubMember, (clubMember) => clubMember.member)
  clubMemberships: ClubMember[];

  @OneToMany(() => ClubMeetingParticipant, (participant) => participant.user)
  participatedMeetings: ClubMeetingParticipant[];

  @Column({ unique: true, name: 'account_id' })
  accountId: number;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true, name: 'image_url' })
  imageUrl: string;

  @Column({ type: 'date', nullable: true, name: 'birthday_date' })
  birthdayDate: Date;

  @Column({ type: 'integer', nullable: true })
  gender: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_id',
  })
  createdAt: Date;
}
