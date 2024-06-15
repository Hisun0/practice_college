import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('nestjs')
export class UserEntity {
  constructor(
    email: string,
    userName: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
  ) {
    this.email = email;
    this.userName = userName;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ name: 'is_email_confirmed', nullable: true, default: false })
  isEmailConfirmed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
