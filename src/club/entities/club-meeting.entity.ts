import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Club } from './club.entity';
import { Court } from '../../court/entities/court.entity';
import { ClubMeetingParticipant } from './club-meeting-participant.entity';

export enum MeetingType {
  REGULAR = 1,
  TEMPORARY = 2,
}

export enum GameType {
  MIXED_DOUBLES = 1,
  ANY_DOUBLES = 2,
  MENS_DOUBLES = 3,
  WOMENS_DOUBLES = 4,
  SINGLES = 5,
}

export enum MeetingStatus {
  RECRUITING = 1,
  RECRUITMENT_CLOSED = 2,
}

@Entity({ schema: 'dev_club_a', name: 'club_meeting' })
export class ClubMeeting {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Club, (club) => club.clubMeetings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'club_id' })
  club: Club;

  @Column({ type: 'timestamp', name: 'meeting_date' })
  meetingDate: Date;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @ManyToOne(() => Court, (court) => court.clubMeetings)
  @JoinColumn({ name: 'court_id' })
  court: Court;

  @Column({ type: 'int', enum: MeetingType, name: 'meeting_type' })
  meetingType: MeetingType;

  @Column({ type: 'int', enum: GameType, name: 'game_type' })
  gameType: GameType;

  @Column({ type: 'int', name: 'capacity' })
  capacity: number;

  @Column({
    type: 'int',
    enum: MeetingStatus,
    default: MeetingStatus.RECRUITING,
    name: 'recruitment_status',
  })
  status: MeetingStatus;

  @Column({ type: 'int', nullable: true })
  cost: number | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    name: 'deposit_account',
  })
  depositAccount: string | null;

  @Column({ type: 'boolean', default: false, name: 'allow_guest' })
  allowGuest: boolean;

  @OneToMany(
    () => ClubMeetingParticipant,
    (participant) => participant.clubMeeting,
  )
  participants: ClubMeetingParticipant[];

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
