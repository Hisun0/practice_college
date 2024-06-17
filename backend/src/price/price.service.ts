import { Injectable, NotFoundException } from '@nestjs/common';
import { PriceEntity } from './entities/price.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  getAll(): Promise<PriceEntity[]> {
    return this.priceRepository.find();
  }

  async addPrice(priceDto: CreatePriceDto): Promise<PriceEntity> {
    const { product_id, price } = priceDto;

    const productId = await this.productRepository.findOneBy({ id: product_id })

    if (!productId) {
      throw new NotFoundException('Product does not exist');
    };

    const newPrice = this.priceRepository.create({
      productId,
      price
    });

    return await this.priceRepository.save(newPrice);
  }

  async updatePrice(id: number, price: UpdatePriceDto): Promise<UpdateResult> {
    return this.priceRepository.update(id, price);
  }
}
