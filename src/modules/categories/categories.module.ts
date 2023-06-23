import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategories } from './main_categories.entity';
import { SubCategories } from './sub_categories.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SpecialCategories } from './special_categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MainCategories,
      SubCategories,
      SpecialCategories,
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
