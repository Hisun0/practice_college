import { Injectable, NotFoundException } from '@nestjs/common';
import { PriceEntity } from './entities/price.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getAll(): Promise<PriceEntity[]> {
    return this.priceRepository.find();
  }

  async addPrice(priceDto: CreatePriceDto): Promise<PriceEntity> {
    const { product_id, price, user_id } = priceDto;

    const productId = await this.productRepository.findOneBy({ id: product_id })

    if (!productId) {
      throw new NotFoundException('Product does not exist');
    };

    const userId = await this.userRepository.findOneBy({ id: user_id })

    if (!userId) {
      throw new NotFoundException('User does not exist');
    };

    const newPrice = this.priceRepository.create({
      productId,
      price,
      userId
    });

    
    try {
      return await this.priceRepository.save(newPrice);
    } catch(_e) {
      throw new NotFoundException('id product is already in use');
    }
  }

  async updatePrice(id: number, priceDto: UpdatePriceDto): Promise<UpdateResult> {
    const { user_id, price } = priceDto;

    const userId = await this.userRepository.findOneBy({ id: user_id });

    if (!userId) {
      throw new NotFoundException('User does not exist');
    };

    const newPrice = this.priceRepository.create({
      userId,
      price
    })

    return this.priceRepository.update(id, newPrice);
  }
}
