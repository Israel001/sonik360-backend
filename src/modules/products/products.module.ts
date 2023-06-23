import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SubCategories } from '../categories/sub_categories.entity';
import { SpecialCategories } from '../categories/special_categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, SubCategories, SpecialCategories]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
