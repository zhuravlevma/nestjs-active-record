import { Injectable } from '@nestjs/common';
import { Order } from '../models/orders.model';
import { OrdersRepository } from '../repositories/orders.repository';
import { UpdateOrderDto } from '../dtos/request/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.findAllOrders();
  }

  findOne(id: number): Promise<Order | null> {
    return this.ordersRepository.findOrderByIdWithDeliveryman(id);
  }

  async updateOrder(
    orderId: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.ordersRepository.findOrderByIdWithDeliveryman(
      orderId,
    );

    updateOrderDto.isActive !== undefined ??
      order.changeStatus(updateOrderDto.isActive);

    updateOrderDto.description !== undefined ??
      order.addInfoToDescription(updateOrderDto.description);

    return this.ordersRepository.save(order);
  }
}
