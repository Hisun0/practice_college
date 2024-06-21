import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-price.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find({ where: { isDeleted: false }});
  }

  findOne(id: number): Promise<ProductEntity[]> {
    return this.productRepository.find({ where: { isDeleted: false, id }});
  }

  async search(param: string): Promise<ProductEntity[]> {
    return await this.productRepository.find({ where: { isDeleted: false, name: ILike(`%${param}%`) }});
  }

  async add(product: CreateProductDto): Promise<ProductEntity> {
    const { userId, name, description, price } = product;

    const userAddId = await this.userRepository.findOneBy({ id: userId });
    if (!userAddId) {
      throw new NotFoundException('User does not exist');
    }

    const newProduct = this.productRepository.create({
      userAddId,
      name,
      description,
      price,
    });

    return this.productRepository.save(newProduct);
  }

  async update(id: number, product: Partial<ProductEntity>): Promise<UpdateResult> {
    return await this.productRepository.update(+id, product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.update(+id, { isDeleted: true });
  }
}
