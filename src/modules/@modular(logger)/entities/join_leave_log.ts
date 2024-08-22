import { Typeorm } from "@zachary_masson/modular-core";
import { JoinLeaveType } from "@modular(logger)/types/join_leave_type";

@Typeorm.Entity({ name: "logger_join_leave_log" })
export class JoinLeaveLog {
  @Typeorm.PrimaryGeneratedColumn()
  id: number;

  @Typeorm.Column({ type: "enum", enum: JoinLeaveType })
  type: JoinLeaveType;

  @Typeorm.Column()
  discord_id: string;

  @Typeorm.Column()
  guild_name: string;

  @Typeorm.CreateDateColumn()
  insert_at: string;
}
