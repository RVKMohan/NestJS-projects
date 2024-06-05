import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './entities/products.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Parent])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
