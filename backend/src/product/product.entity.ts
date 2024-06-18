
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PriceEntity } from "../price/entities/price.entity"
import { FavoriteEntity } from "src/favorites/entities/favorite.entity";

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: new Date(), name: "created_at" })
  createdAt: string;

  @ManyToOne(() => UserEntity, (user) => user.product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_add_id" })
  userAddId: UserEntity;

  @ManyToMany(() => FavoriteEntity, (favorit) => favorit.userId)
  favorite: FavoriteEntity;

  @OneToOne(() => PriceEntity, (price) => price.productId, { onDelete: "CASCADE" })
  priceId: PriceEntity;

  @Column({ default: false, name: "is_deleted" })
  isDeleted: boolean;
}
