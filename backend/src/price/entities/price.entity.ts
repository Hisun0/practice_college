import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('price')
export class PriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  price: number;

  @OneToOne(() => ProductEntity, (product) => product.priceId)
  @JoinColumn({ name: "product_id" })
  productId: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.priceId)
  @JoinColumn({ name: "user_id" })
  userId: UserEntity;

  @Column({ default: new Date() })
  created_at: string;
}
