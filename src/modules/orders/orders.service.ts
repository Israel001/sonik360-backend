import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./orders.entity";

@Injectable()
export class OrdersService {
  public logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order) public orderRepository: Repository<Order>
  ) { }
  
  async fetch() {
    return this.orderRepository.find({});
  }
}