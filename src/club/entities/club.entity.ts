import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Court } from '../../court/entities/court.entity';
import { ClubMember } from './club-member.entity';
import { ClubNotice } from './club-notice.entity';
import { ClubMeeting } from './club-meeting.entity';

@Entity({ schema: 'dev_club_a', name: 'club' })
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 400, nullable: true })
  description: string | null;

  @ManyToOne(() => User, (user) => user.ownedClubs)
  @JoinColumn({ name: 'club_leader_id' })
  clubLeader: User;

  @Column({ nullable: true, name: 'club_emblem' })
  clubEmblem: string;

  @ManyToMany(() => Court)
  @JoinTable({
    name: 'club_active_courts',
    joinColumn: { name: 'club_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'court_id', referencedColumnName: 'id' },
  })
  activeCourts: Court[];

  @OneToMany(() => ClubMember, (clubMember) => clubMember.club, {
    nullable: true,
  })
  clubMembers?: ClubMember[] | null;

  @OneToMany(() => ClubNotice, (clubNotice) => clubNotice.club, {
    nullable: true,
  })
  clubNotices?: ClubNotice[] | null;

  @OneToMany(() => ClubMeeting, (clubMeeting) => clubMeeting.club, {
    nullable: true,
  })
  clubMeetings?: ClubMeeting[] | null;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
