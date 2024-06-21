import { ProductEntity } from 'src/product/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FeedbackEntity } from '../../feedback/entities/feedback.entity';
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity';

@Entity('users') // потом переименовать надо будет
export class UserEntity {
  constructor(
    email: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
  ) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "email", type: "varchar", length: 255 })
  email: string;

  @Column({ name: 'password_hash', nullable: false, type: "varchar", length: 255 })
  passwordHash: string;

  @Column({ name: 'first_name', nullable: false, type: "varchar", length: 255 })
  firstName: string;

  @Column({ name: 'last_name', nullable: false, type: "varchar", length: 255 })
  lastName: string;

  @Column({ name: 'refresh_token', nullable: true, type: "varchar", length: 255 })
  refreshToken: string;

  @Column({ name: 'is_email_confirmed', nullable: true, default: false })
  isEmailConfirmed: boolean;

  @Column({ name: 'is_deleted', nullable: true, default: false })
  isDeleted: boolean;

  @Column({ name: "phone_number", nullable: true, type: "varchar", length: 255})
  phoneNumber: string;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.seller, {
    onDelete: 'CASCADE',
  })
  feedbacks: FeedbackEntity[];

  @OneToMany(() => FavoriteEntity, (favorit) => favorit.userId)
  favorite: FavoriteEntity;
  
  @OneToMany(() => ProductEntity, (product) => product.userAddId)
  product: ProductEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
