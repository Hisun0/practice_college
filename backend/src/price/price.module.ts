import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceEntity } from './entities/price.entity';
import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriceEntity, ProductEntity, UserEntity])],
  providers: [PriceService],
  controllers: [PriceController],
  exports: [PriceService]
})
export class PriceModule {}
