import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ClubMeeting } from './club-meeting.entity';
import { User } from '../../users/entities/user.entity';

export enum ParticipantStatus {
  PENDING = 1,
  APPROVED = 2,
  ADDED = 3,
  CANCELLED_BY_USER = 4,
  REJECTED = 5,
}

@Entity({ schema: 'dev_club_a', name: 'club_meeting_participant' })
export class ClubMeetingParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClubMeeting, (clubMeeting) => clubMeeting.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'club_meeting_id' })
  clubMeeting: ClubMeeting;

  @ManyToOne(() => User, (user) => user.participatedMeetings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', enum: ParticipantStatus })
  status: ParticipantStatus;

  @Column({ type: 'boolean', default: false, name: 'is_guest' })
  isGuest: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_paid' })
  isPaid: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
