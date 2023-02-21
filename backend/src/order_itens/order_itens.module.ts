import { Module } from '@nestjs/common';
import { OrderItensService } from './order_itens.service';
import { OrderItensController } from './order_itens.controller';

@Module({
  controllers: [OrderItensController],
  providers: [OrderItensService],
})
export class OrderItensModule {}
