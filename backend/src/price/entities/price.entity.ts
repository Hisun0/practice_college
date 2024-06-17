import { ProductEntity } from "src/product/product.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('price')
export class PriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  price: number;

  @OneToOne(() => ProductEntity, (product) => product.priceId)
  @JoinColumn({ name: "product_id" })
  productId: ProductEntity;

  @Column({ default: new Date() })
  created_at: string;
}
