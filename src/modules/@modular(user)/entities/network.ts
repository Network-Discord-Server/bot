import { Typeorm } from "@zachary_masson/modular-core";
import { User } from "../entities/user";
import { NetworksType } from "@modular(user)/types/networks";

@Typeorm.Entity({ name: "user_network" })
export class Network {
  @Typeorm.PrimaryGeneratedColumn()
  id: number;

  @Typeorm.ManyToOne((type) => User, (user) => user.networks)
  user: User;

  @Typeorm.Column({ type: "enum", enum: NetworksType })
  type: NetworksType;

  @Typeorm.CreateDateColumn()
  insert_at: string;
}
