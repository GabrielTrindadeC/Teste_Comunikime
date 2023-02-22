import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, Product]),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
