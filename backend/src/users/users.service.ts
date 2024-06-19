import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUserName(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ email });
  }

  existsByEmail(userEmail: string): Promise<boolean> {
    return this.usersRepository.existsBy({ email: userEmail });
  }

  // existsByUsername(username: string): Promise<boolean> {
  //   return this.usersRepository.existsBy({ username });
  // }

  async update(
    userId: number,
    partialEntity: Partial<UserEntity>,
  ): Promise<UpdateResult> {
    return await this.usersRepository.update(userId, partialEntity);
  }

  async add(user: UserEntity): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.update(id, { isDeleted: true });
  }
}
