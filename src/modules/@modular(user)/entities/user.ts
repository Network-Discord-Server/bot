import { Typeorm } from "@zachary_masson/modular-core";
import { Network } from "../entities/network";

@Typeorm.Entity({ name: "user_user" })
export class User {
  @Typeorm.PrimaryGeneratedColumn()
  id: number;

  @Typeorm.Column({ unique: true })
  discord_id: string;

  @Typeorm.Column()
  username: string;

  @Typeorm.Column()
  firstname: string;

  @Typeorm.Column()
  lastname: string;

  @Typeorm.Column()
  age: number;

  @Typeorm.OneToMany((type) => Network, (network) => network.user, {
    cascade: true,
  })
  networks: Network[];

  @Typeorm.Column({ nullable: true })
  work?: string;

  @Typeorm.Column({ type: "json", nullable: true })
  languages?: string[];

  @Typeorm.Column({ type: "json", nullable: true })
  technologies?: string[];

  @Typeorm.CreateDateColumn()
  insert_at: string;

  @Typeorm.UpdateDateColumn()
  updated_at: string;
}
