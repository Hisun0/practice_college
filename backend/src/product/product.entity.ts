import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ default: new Date(), name: 'created_at' })
  createdAt: string;

  @ManyToOne(() => UserEntity, (user) => user.product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_add_id' })
  userAddId: UserEntity;

  @ManyToMany(() => FavoriteEntity, (favorit) => favorit.userId)
  favorite: FavoriteEntity;

  @Column()
  price: number;

  @Column({ default: false, name: "is_deleted" })
  isDeleted: boolean;
}
