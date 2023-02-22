import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Purchase } from '../../purchases/entities/purchase.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  email: string;
  @Column({ default: 1 })
  role: number;
  @Column()
  password: string;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
