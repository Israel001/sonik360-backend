import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('special_categories', { synchronize: false })
export class SpecialCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ length: 50, unique: true })
  @AutoMap()
  name: string;

  @Column()
  products: string;
}
