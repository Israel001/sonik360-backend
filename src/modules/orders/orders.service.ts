import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { PaystackConfig } from 'src/config/types/paystack.config';
import { VerifyPaymentDto } from './orders.dto';
import * as mailer from 'nodemailer-promise';
import { NodemailerConfig } from 'src/config/types/nodemailer.config';

@Injectable()
export class OrdersService {
  public logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order) public orderRepository: Repository<Order>,
    private readonly configService: ConfigService,
  ) {}

  async fetch() {
    return this.orderRepository.find({});
  }

  async verifyPayment(reference: string, orderDetails: VerifyPaymentDto) {
    const paystackConfig =
      this.configService.get<PaystackConfig>('paystackConfig');
    const nodemailerConfig =
      this.configService.get<NodemailerConfig>('nodemailerConfig');
    const response = await axios.get(
      `${paystackConfig.baseUrl}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackConfig.secretKey}`,
        },
      },
    );
    if (
      response.data.data.status != 'success' ||
      response.data.data.amount / 100 != orderDetails.amount
    ) {
      throw new UnauthorizedException('Payment could not be verified');
    }
    const send = mailer.config({
      host: nodemailerConfig.host,
      port: nodemailerConfig.port,
      secure: true,
      from: '"Sonik360" <info@sonik360.com>',
      auth: {
        user: nodemailerConfig.username,
        pass: nodemailerConfig.password,
      },
    });
    send({
      from: 'info@sonik360.com',
      to: 'i.obanijesu@gmail.com',
      subject: 'Order Created',
      text: 'An order has been created',
    });
    return this.orderRepository
      .create({
        dateOrdered: new Date(),
        status: 'In Progress',
        amount: orderDetails.amount,
        details: JSON.stringify(orderDetails.details),
      })
      .save();
  }
}
