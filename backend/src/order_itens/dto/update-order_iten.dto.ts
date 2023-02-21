import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItenDto } from './create-order_iten.dto';

export class UpdateOrderItenDto extends PartialType(CreateOrderItenDto) {}
