import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersController } from "./orders.controller";
import { Order } from "./orders.entity";
import { OrdersService } from "./orders.service";
import { ConfigModule } from "@nestjs/config";
import { NodemailerConfiguration, PaystackConfiguration } from "src/config/configuration";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ConfigModule.forRoot({
      load: [PaystackConfiguration, NodemailerConfiguration],
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}