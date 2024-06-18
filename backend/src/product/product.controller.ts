import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-price.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productService.add(product);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() product: ProductEntity) {
    return this.productService.update(+id, product);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
