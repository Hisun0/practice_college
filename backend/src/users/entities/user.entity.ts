import { ProductEntity } from 'src/product/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { FeedbackEntity } from '../../feedback/entities/feedback.entity';

@Entity('users') // потом переименовать надо будет
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

  @Column({ name: 'is_user_deleted', nullable: true, default: false })
  isUserDeleted: boolean;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.seller, {
    onDelete: 'CASCADE',
  })
  feedbacks: FeedbackEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ default: new Date() })
  updated_at: Date;

  @OneToMany(() => ProductEntity, (product) => product.userAddId)
  product: ProductEntity[];
}
