import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Controller()
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get('/getAllPrice')
  getAllPrice() {
    return this.priceService.getAll();
  }

  @Post('/addPrice')
  addPrice(@Body() price: CreatePriceDto) {
    return this.priceService.addPrice(price);
  }

  @Patch('/updatePrice/:id')
  updatePrice(@Param('id') id: string, @Body() price: UpdatePriceDto) {
    return this.priceService.updatePrice(+id, price)
  }

  // @Get()
  // findAll() {
  //   return this.priceService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.priceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
  //   return this.priceService.update(+id, updatePriceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.priceService.remove(+id);
  // }
}
