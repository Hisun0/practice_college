import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Repository, UpdateResult } from 'typeorm';
import { FeedbackEntity } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,

    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<FeedbackEntity> {
    const { sellerId, reviewerId, rating, feedbackText } = createFeedbackDto;

    const seller = await this.usersRepository.findOneBy({ id: sellerId });
    if (!seller) {
      throw new NotFoundException('Seller does not exist');
    }

    const reviewer = await this.usersRepository.findOneBy({ id: reviewerId });
    if (!reviewer) {
      throw new NotFoundException('Reviewer does not exist');
    }

    const feedback = this.feedbackRepository.create({
      seller,
      reviewer,
      rating,
      feedbackText,
    });

    return await this.feedbackRepository.save(feedback);
  }

  async findAllByUserId(userId: number): Promise<FeedbackEntity[]> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return await this.feedbackRepository.find({
      where: { seller: { id: userId } },
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  async update(
    id: number,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<UpdateResult> {
    return await this.feedbackRepository.update(id, updateFeedbackDto);
  }

  remove(id: number) {
    return this.feedbackRepository.update(id, { isDeleted: true });
  }
}
