import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItensService } from './order_itens.service';
import { CreateOrderItenDto } from './dto/create-order_iten.dto';
import { UpdateOrderItenDto } from './dto/update-order_iten.dto';

@Controller('order-itens')
export class OrderItensController {
  constructor(private readonly orderItensService: OrderItensService) {}

  @Post()
  create(@Body() createOrderItenDto: CreateOrderItenDto) {
    return this.orderItensService.create(createOrderItenDto);
  }

  @Get()
  findAll() {
    return this.orderItensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItensService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItenDto: UpdateOrderItenDto,
  ) {
    return this.orderItensService.update(+id, updateOrderItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItensService.remove(+id);
  }
}
