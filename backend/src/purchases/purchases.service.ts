import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class PurchasesService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly productService: ProductsService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(userId: number, productsId: number[]) {
    const user = await this.userService.findOne(userId);
    const products: Product[] = await this.productService.findByIds(productsId);
    const value = products.reduce((value, item) => {
      if (typeof item.price === 'number') {
        return value + item.price;
      }
      return value;
    }, 0);
    for (const product of products) {
      product.stock -= 1;
    }
    await this.productRepository.save(products);
    return await this.purchaseRepository.save({ products, user, value });
  }

  async getAll() {
    return await this.purchaseRepository.find();
  }
  async findByUserId(userId: number): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      where: { user: { id: userId } },
      select: ['products'],
    });
  }
}
