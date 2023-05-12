import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "src/base/entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Product } from "../products/products.entity";
import { MainCategories } from "./main_categories.entity";

@Entity('sub_categories', { synchronize: false })
export class SubCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @ManyToOne(() => MainCategories, (mainCategory) => mainCategory.subCategories, { eager: true })
  mainCategory: Promise<MainCategories>;

  @OneToMany(() => Product, (product) => product.category, {
    lazy: true,
  })
  products: Promise<Product[]>;

  @Column({ length: 50, unique: true })
  @AutoMap()
  name: string;
}
