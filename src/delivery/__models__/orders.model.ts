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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  deliverymanId: string;

  @ManyToOne(() => Deliveryman, (deliveryMan) => deliveryMan.orders)
  @JoinColumn({ name: 'deliverymanId', referencedColumnName: 'id' })
  deliveryman: Deliveryman;

  static create(name: string, description: string): Order {
    const order = new Order();
    order.name = name;
    order.description = description;

    order.checkName();

    return order;
  }

  checkName() {
    if (this.name.length < 3) {
      throw new Error('The length of the name is less than 3');
    }
  }

  changeStatus(newStatus: boolean) {
    if (newStatus === true) {
      this.deliver();
    } else {
      this.return();
    }
  }

  addInfoToDescription(info: string) {
    this.description += '\n' + info;
  }

  return() {
    this.addInfoToDescription('This order has been returned :(');
  }

  deliver() {
    this.isActive = false;
    this.addInfoToDescription('This order has been delivered.');
  }
}
