import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PurchasesModule } from './purchases/purchases.module';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 100,
    }),
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
    CategoryModule,
    ProductsModule,
    forwardRef(() => AuthModule),
    PurchasesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
