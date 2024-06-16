import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find({ where: { is_deleted: false }});
  }

  findOne(id: number): Promise<ProductEntity[]> {
    return this.productRepository.find({ where: { is_deleted: false, id }});
  }

  async add(product: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.save(product);
  }

  async update(id: number, product: Partial<ProductEntity>): Promise<UpdateResult> {
    return await this.productRepository.update(+id, product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.update(+id, { is_deleted: true });
  }
}
