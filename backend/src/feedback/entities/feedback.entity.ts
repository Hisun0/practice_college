import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('feedback')
export class FeedbackEntity {
  constructor(
    seller: UserEntity,
    reviewer: UserEntity,
    feedbackText: string,
    rating: number,
  ) {
    this.seller = seller;
    this.reviewer = reviewer;
    this.feedbackText = feedbackText;
    this.rating = rating;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.feedbacks, { nullable: false })
  @JoinColumn({ name: 'seller_id' })
  seller: UserEntity;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: UserEntity;

  @Column({ name: 'feedback_text', nullable: false })
  feedbackText: string;

  @Column({ nullable: false })
  rating: number;

  @Column({ name: 'is_deleted', nullable: true, default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
