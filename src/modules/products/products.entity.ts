import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/base/entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { SubCategories } from '../categories/sub_categories.entity';
import { SpecialCategories } from '../categories/special_categories.entity';

@Entity('products', { synchronize: false })
export class Product extends BaseEntity {
  @PrimaryColumn()
  @AutoMap()
  name: string;

  @Column({ unique: true, nullable: true })
  @AutoMap()
  slug: string;

  @Column({ type: 'longtext' })
  @AutoMap()
  image: string;

  @Column({ type: 'longtext' })
  @AutoMap()
  reviews: string;

  @Column({ type: 'longtext' })
  @AutoMap()
  shortDescription: string;

  @Column()
  @AutoMap()
  price: number;

  @Column()
  @AutoMap()
  originalPrice: number;

  @Column()
  @AutoMap()
  discount: number;

  @Column({ type: 'longtext' })
  @AutoMap()
  brand: string;

  @Column()
  @AutoMap()
  availability: number;

  @Column({ type: 'longtext' })
  @AutoMap()
  colors: string;

  @Column({ type: 'longtext' })
  @AutoMap()
  attributes: string;

  @Column({ type: 'longtext' })
  @AutoMap()
  type: string;

  @ManyToOne(() => SubCategories, (subCategory) => subCategory.products, {
    eager: true,
  })
  category: Promise<SubCategories>;
}
