
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: new Date() })
  created_at: string;

  @ManyToOne(() => UserEntity, (user) => user.product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user_id: UserEntity;

  @Column({ default: false })
  is_deleted: boolean;
}
