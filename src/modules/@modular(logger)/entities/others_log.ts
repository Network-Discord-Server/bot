import { Typeorm } from "@zachary_masson/modular-core";

@Typeorm.Entity({ name: "logger_others_log" })
export class OthersLog {
  @Typeorm.PrimaryGeneratedColumn()
  id: number;

  @Typeorm.Column()
  type: string;

  @Typeorm.Column({ type: "json" })
  data: any;

  @Typeorm.CreateDateColumn()
  insert_at: string;
}
