import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Entity('verification')
export class VerificationEntity {
  constructor(userId: number, email: string, code: string) {
    this.userId = userId;
    this.email = email;
    this.code = code;
  }

  @PrimaryColumn()
  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  userId: number;

  @Column()
  email: string;

  @Column()
  code: string;
}
