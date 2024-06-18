import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('favorite')
@Unique(["userId", "productId"])
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.favorite)
  @JoinColumn({ name: "user_id" })
  userId: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.favorite)
  @JoinColumn({ name: "product_id" })
  productId: ProductEntity;

  @Column({ default: new Date(), name: "created_at" })
  createdAt: string;
}
