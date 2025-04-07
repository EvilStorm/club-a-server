import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity'; // User 엔티티 import

@Entity({ name: 'user_extends_info', schema: 'dev_club_a' })
export class UserExtendsInfo {
  @PrimaryColumn({
    type: 'int',
    unique: true,
    nullable: false,
    name: 'user_id',
  })
  userId: number;

  @Column({ type: 'date', nullable: true, name: 'started_at' })
  startedAt: Date | null;

  @Column({ type: 'int', nullable: true })
  hands: number | null;

  @Column({ type: 'int', nullable: true })
  ntr: number | null;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'update_at',
  })
  updatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.extendsInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
