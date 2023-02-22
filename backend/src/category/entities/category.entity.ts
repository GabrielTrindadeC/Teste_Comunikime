import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Product, () => Product)
  products: Product[];
}
