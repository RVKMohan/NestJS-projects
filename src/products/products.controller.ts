import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';

import {ParentDto} from './dto/products.dto';
import {ChildDto} from './dto/products.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() productsDto: ParentDto) {
    const product = await this.productsService.create(productsDto);
    return {
      statusCode: HttpStatus.OK,
     message: 'User created successfully',
     product
    }
  }
}

//   @Get()
//   findAll() {
//     return this.productsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.productsService.findOne(+id);
//   }

//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updateProductDto: ParentDto) {
//   //   return this.productsService.update(+id, updateProductDto);
//   // }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.productsService.remove(+id);
//   }

