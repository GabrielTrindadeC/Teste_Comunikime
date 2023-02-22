import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  created_at: Date;
  @ManyToOne(() => User, (user) => user.purchases)
  user: User;
  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products: Product[];
  @Column()
  value: number;
}
