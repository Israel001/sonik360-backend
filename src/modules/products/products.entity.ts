import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "src/base/entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { SubCategories } from "../categories/sub_categories.entity";

@Entity('products', { synchronize: true })
export class Product extends BaseEntity {
  @PrimaryColumn()
  @AutoMap()
  name: string;

  @Column({ unique: true, nullable: true })
  @AutoMap()
  slug: string;

  @Column()
  @AutoMap()
  image: string;

  @Column()
  @AutoMap()
  reviews: string;

  @Column()
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

  @Column()
  @AutoMap()
  brand: string;

  @Column()
  @AutoMap()
  availability: number;

  @Column()
  @AutoMap()
  colors: string;

  @Column('longtext')
  @AutoMap()
  attributes: string;

  @Column()
  @AutoMap()
  type: string;

  @ManyToOne(() => SubCategories, (subCategory) => subCategory.products, { eager: true })
  category: Promise<SubCategories>;
}
