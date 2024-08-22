import {
  Event,
  EventTypes,
  IsExecutor,
  Core,
  Discord,
  UseEntity,
  Typeorm,
} from "@zachary_masson/modular-core";

import { JoinLeaveLog } from "@modular(logger)/entities/join_leave_log";
import { JoinLeaveType } from "@modular(logger)/types/join_leave_type";
import { JoinLeaveCreate } from "@modular(logger)/functions/join_leave/create";

@Event(EventTypes.guildMemberRemove)
class MemberLeave {
  constructor(
    @UseEntity(JoinLeaveLog)
    private joinLeaveLog: Typeorm.Repository<JoinLeaveLog>,
  ) {}

  @IsExecutor()
  on(core: Core, client: Discord.Client<true>, member: Discord.GuildMember) {
    return JoinLeaveCreate(this.joinLeaveLog, JoinLeaveType.LEAVE, member);
  }
}

export = MemberLeave;
