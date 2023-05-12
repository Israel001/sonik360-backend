import { AutoMap } from "@automapper/classes";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders', { synchronize: false })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column('datetime')
  @AutoMap()
  dateOrdered: Date;

  @Column('datetime', { nullable: true })
  @AutoMap()
  dateCompleted: Date;

  @Column()
  @AutoMap()
  status: string;

  @Column('float', { default: 0 })
  @AutoMap()
  amount: number;

  @Column('longtext', { nullable: true })
  @AutoMap()
  details: string;
}