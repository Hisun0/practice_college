import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('verification')
export class VerificationEntity {
  constructor(userId: number, email: string, code: string) {
    this.userId = userId;
    this.email = email;
    this.code = code;
  }

  @PrimaryColumn()
  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  userId: number;

  @Column()
  email: string;

  @Column()
  code: string;
}