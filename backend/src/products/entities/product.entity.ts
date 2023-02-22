import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column({ name: 'img_url' })
  imgUrl: string;
  @ManyToOne(() => Category, () => Category, { eager: true })
  @JoinColumn()
  category: Category;
  @Column()
  stock: number;
  @Column()
  description: string;
}
