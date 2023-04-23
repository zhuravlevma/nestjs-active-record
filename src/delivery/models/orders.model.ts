import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Deliveryman } from './deliveryman.model';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  deliverymanId: number;

  @ManyToOne(() => Deliveryman, (deliveryMan) => deliveryMan.orders)
  @JoinColumn({ name: 'deliverymanId', referencedColumnName: 'id' })
  deliveryman: Deliveryman;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  checkName() {
    if (this.name.length < 3) {
      throw new Error('The length of the name is less than 3');
    }
  }
}