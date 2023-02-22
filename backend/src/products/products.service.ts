import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll() {
    return await this.productRepository.find();
  }
  async findByIds(ids: number[]) {
    const products: Product[] = [];
    for (const id of ids) {
      const product = await this.productRepository.findOne({
        where: {
          id: id,
        },
      });
      if (product) {
        products.push(product);
      }
    }
    return products;
  }
  async findOne(id: number) {
    try {
      return await this.productRepository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.productRepository.delete(id);
  }
}
