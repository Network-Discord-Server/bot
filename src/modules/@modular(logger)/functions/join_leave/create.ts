import type { Discord, Typeorm } from "@zachary_masson/modular-core";
import type { JoinLeaveType } from "@modular(logger)/types/join_leave_type";
import type { JoinLeaveLog } from "@modular(logger)/entities/join_leave_log";

export async function JoinLeaveCreate(
  entity: Typeorm.Repository<JoinLeaveLog>,
  type: JoinLeaveType,
  member: Discord.GuildMember,
) {
  const log = entity.create({
    type,
    discord_id: member.id,
    guild_name: member.guild.name,
  });

  return await entity.save(log);
}
