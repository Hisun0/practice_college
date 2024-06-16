import { ProductEntity } from 'src/product/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

<<<<<<< HEAD:backend/src/user/user.entity.ts
  @CreateDateColumn({ default: new Date() })
=======
  @Column({ name: 'is_email_confirmed', nullable: true, default: false })
  isEmailConfirmed: boolean;

  @Column({ name: 'is_user_deleted', nullable: true, default: false })
  isUserDeleted: boolean;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.seller, {
    onDelete: 'CASCADE',
  })
  feedbacks: FeedbackEntity[];

  @CreateDateColumn()
>>>>>>> 52adb18b6f6e66278094ddfe4587447b4daf2d29:backend/src/users/entities/user.entity.ts
  created_at: Date;

  @UpdateDateColumn({ default: new Date() })
  updated_at: Date;

  @OneToMany(() => ProductEntity, (product) => product.user)
  product: ProductEntity[];
}
