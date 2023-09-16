import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    const index = this.productRepo.delete(id);
  }
}
