import { Injectable } from '@nestjs/common';
import { Order } from 'src/delivery/__models__/orders.model';
import { OrdersRepository } from 'src/delivery/orders/dal/orders.repository';
import { UpdateOrderDto } from 'src/delivery/orders/dtos/update-order.dto';

@Injectable()
export class UpdateOrderService {
  constructor(private ordersRepository: OrdersRepository) {}

  async updateOrder(
    orderId: string,
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
