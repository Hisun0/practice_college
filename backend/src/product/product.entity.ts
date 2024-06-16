import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: new Date() })
  created_at: string;

  @ManyToOne(() => UserEntity, (user) => user.product)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;
}
