import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { OrderItensModule } from './order_itens/order_itens.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'admin',
      autoLoadEntities: true,
      synchronize: true,
    }),
    forwardRef(() => UsersModule),
    OrdersModule,
    CategoryModule,
    ProductsModule,
    OrderItensModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
