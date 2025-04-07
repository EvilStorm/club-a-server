import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { ClubMeeting } from '../../club/entities/club-meeting.entity';

@Entity({ schema: 'dev_club_a', name: 'court' })
export class Court {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  location: string;

  @Column({ type: 'int', name: 'surface_count' })
  surfaceCount: number;

  @Column({ type: 'int', name: 'court_in_out_state' })
  courtInOutState: number;

  @OneToMany(() => ClubMeeting, (clubMeeting) => clubMeeting.court)
  clubMeetings: ClubMeeting[];

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
