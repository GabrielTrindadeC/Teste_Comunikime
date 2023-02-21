import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
Entity();
export class OrderIten {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  quantity: number;
  @Column({ name: 'total_value' })
  totalValue: number;
}
