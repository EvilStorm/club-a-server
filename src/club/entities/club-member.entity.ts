import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Club } from './club.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ schema: 'dev_club_a', name: 'club_member' })
export class ClubMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Club, (club) => club.clubMembers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'club_id' })
  club: Club;

  @ManyToOne(() => User, (user) => user.clubMemberships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'member_user_id' })
  member: User;

  @Column({ type: 'int', enum: [1, 2, 3] })
  status: number; // 1: 대기, 2: 승인, 3: 차단

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
