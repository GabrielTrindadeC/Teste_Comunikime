import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
