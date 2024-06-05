import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Child } from './entities/products.entity';
import { Parent } from './entities/products.entity';
import { Repository } from 'typeorm';
import { ParentDto } from './dto/products.dto';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Parent)
    private productsRepository: Repository<Parent>,
  ){}

  
  async create(data: ParentDto) {
    const parentEntity = new Parent()
    parentEntity.category=data.category
    parentEntity.model=data.model
    let childData =[]
    for(const rec of data.childData){
      const childEntity = new Child()
      childEntity.item=rec.item
      childEntity.itemprice=rec.itemprice
      childData.push(childEntity)
    }
    parentEntity.child=childData

    console.log(parentEntity,'############')
    const productData = this.productsRepository.create(parentEntity);
    await this.productsRepository.save(parentEntity);
    return productData 

    // const productData = this.productsRepository.create(data);
    // await this.productsRepository.save(data);
    // return productData;
  }

  async findAll(): Promise<Parent[]> {
    return await this.productsRepository.find();
   }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

   update(id: number, ProductDto: ParentDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
