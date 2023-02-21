import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
