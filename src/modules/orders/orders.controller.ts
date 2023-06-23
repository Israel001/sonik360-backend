import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { VerifyPaymentDto } from './orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  fetch() {
    return this.orderService.fetch();
  }

  @Post('/verify/:reference')
  verifyPayment(
    @Param('reference') reference: string,
    @Body() body: VerifyPaymentDto,
  ) {
    return this.orderService.verifyPayment(reference, body);
  }
}
