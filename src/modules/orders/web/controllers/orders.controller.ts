import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { FindAllOrdersService } from 'src/modules/orders/services/find-all-orders.service';
import { UpdateOrderService } from 'src/modules/orders/services/update-order.service';
import { Order } from 'src/models/orders.model';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly findAllOrdersService: FindAllOrdersService,
    private readonly updateOrderService: UpdateOrderService,
  ) {}

  @Get('/')
  find(): Promise<Order[]> {
    return this.findAllOrdersService.findAll();
  }

  @Post('/:orderId')
  updateOrderById(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.updateOrderService.updateOrder(+orderId, updateOrderDto);
  }
}