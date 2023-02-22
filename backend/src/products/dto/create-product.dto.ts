import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../../category/entities/category.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  imgUrl: string;
  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
