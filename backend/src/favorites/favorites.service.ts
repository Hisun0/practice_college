import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from 'src/product/product.entity';

@Injectable()
export class FavoritesService {
  constructor (
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  findAll() {
    return this.favoriteRepository.find();
  }

  findOne(id: number): Promise<FavoriteEntity[]> {
    return this.favoriteRepository.find({
      where: { userId: { id } }
    });
  }

  async create(favorit: CreateFavoriteDto): Promise<FavoriteEntity> {
    const { user_id, product_id } = favorit;

    const userId = await this.userRepository.findOneBy({ id: user_id });

    if (!userId) {
      throw new NotFoundException("User does not exist");
    }

    const productId = await this.productRepository.findOneBy({ id: product_id });

    if (!productId) {
      throw new NotFoundException("Product does not exist");
    }

    try {
      const newFavorite = this.favoriteRepository.create({
        userId,
        productId
      });
      return await this.favoriteRepository.save(newFavorite);
    } catch(_e) {
      throw new NotFoundException("Продукт уже добавлен в избранное")
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.favoriteRepository.delete(id);
  }
}
