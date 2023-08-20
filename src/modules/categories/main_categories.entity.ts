import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "src/base/entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategories } from "./sub_categories.entity";

@Entity('main_categories', { synchronize: false })
export class MainCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;
  
  @Column({ unique: true })
  @AutoMap()
  name: string;

  @OneToMany(() => SubCategories, subCategory => subCategory.mainCategory, { lazy: true })
  subCategories: Promise<SubCategories[]>
}