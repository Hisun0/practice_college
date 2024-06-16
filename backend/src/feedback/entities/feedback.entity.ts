import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
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
  @JoinColumn({ name: 'user_id' })
  seller: UserEntity;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  reviewer: UserEntity;

  @Column({ name: 'feedback_text', nullable: false })
  feedbackText: string;

  @Column({ nullable: false })
  rating: number;

  @Column({ name: 'is_feedback_deleted', nullable: true, default: false })
  isFeedbackDeleted: boolean;
}
