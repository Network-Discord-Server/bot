import { Manifest } from "@zachary_masson/modular-core";

/*          Imports Mapping         */

// Commands
import LoggerList from "@modular(logger)/commands/logger_list";

// Events
import MemberLeave from "@modular(logger)/events/member_leave";
import MemberJoin from "@modular(logger)/events/member_join";

// ContextMenus

// Buttons

// Entities
import { OthersLog } from "@modular(logger)/entities/others_log";
import { JoinLeaveLog } from "@modular(logger)/entities/join_leave_log";

const manifest: Manifest = new Manifest({
  name: "logger",
  description: "Module for manage all logs",
  author: "Zachary Masson <contact@zacharymasson.com>",
  mappings: {
    commands: [LoggerList],
    events: [MemberJoin, MemberLeave],
    context_menus: [],
    buttons: [],
    entities: [JoinLeaveLog, OthersLog],
  },
});

export = manifest;
