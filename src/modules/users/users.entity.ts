import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "src/base/entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users', { synchronize: false })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ length: 50 })
  @AutoMap()
  firstname: string;

  @Column({ length: 50 })
  @AutoMap()
  lastname: string;

  @Column({ length: 50 })
  @AutoMap()
  email: string;

  @Column({ length: 15 })
  @AutoMap()
  phone: string;

  @Column()
  @AutoMap()
  password: string;

  @Column({ length: 200, nullable: true })
  @AutoMap()
  address: string;
}