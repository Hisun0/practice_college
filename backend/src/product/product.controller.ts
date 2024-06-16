import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/addProduct')
  create(@Body() product: ProductEntity) {
    return this.productService.add(product);
  }

  @Get('/getAllProduct')
  findAll() {
    return this.productService.findAll();
  }

  @Get('/getProduct/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('/updateProduct/:id')
  update(@Param('id') id: string, @Body() product: ProductEntity) {
    return this.productService.update(+id, product);
  }

  @Delete('/deleteProduct/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
