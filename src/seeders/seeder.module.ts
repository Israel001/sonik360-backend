import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategories } from 'src/modules/categories/main_categories.entity';
import { SubCategories } from 'src/modules/categories/sub_categories.entity';
import { Product } from 'src/modules/products/products.entity';
import databaseConfig from '../config/ormconfig';
import { ISeederConstructor } from './seeder.interface';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([MainCategories, SubCategories, Product])
  ]
})
export default class SeederModule {
  public static seederClasses: ISeederConstructor[] = [];
  static forRoot(seeders: ISeederConstructor[]): DynamicModule {
    SeederModule.seederClasses = seeders || [];
    return {
      global: true,
      module: SeederModule,
      providers: seeders,
    };
  }
}
