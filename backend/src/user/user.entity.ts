import { ProductEntity } from 'src/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users') // потом переименовать надо будет
export class UserEntity {
  constructor(
    email: string,
    userName: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
  ) {
    this.email = email;
    this.userName = userName;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @CreateDateColumn({ default: new Date() })
  created_at: Date;

  @UpdateDateColumn({ default: new Date() })
  updated_at: Date;

  @OneToMany(() => ProductEntity, (product) => product.user)
  product: ProductEntity[];
}
