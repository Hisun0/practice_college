import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FeedbackEntity } from '../../feedback/entities/feedback.entity';

@Entity('nestjs')
export class UserEntity {
  constructor(
    email: string,
    username: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
  ) {
    this.email = email;
    this.username = username;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ name: 'password_hash', nullable: false })
  passwordHash: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ name: 'is_email_confirmed', nullable: true, default: false })
  isEmailConfirmed: boolean;

  @Column({ name: 'is_deleted', nullable: true, default: false })
  isDeleted: boolean;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.seller, {
    onDelete: 'CASCADE',
  })
  feedbacks: FeedbackEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
