import {
  Discord,
  IsExecutor,
  Command,
  Core,
  UseEntity,
  Typeorm,
} from "@zachary_masson/modular-core";
import { JoinLeaveList } from "@modular(logger)/functions/join_leave/list";
import { Pagination } from "@modular(logger)/functions/pagination";
import { JoinLeaveLog } from "@modular(logger)/entities/join_leave_log";
import { Count } from "@modular(logger)/functions/count";
import { OthersLog } from "@modular(logger)/entities/others_log";
import { OthersList } from "@modular(logger)/functions/others/list";

const command = new Discord.SlashCommandBuilder();
command.setName("logger_list");
command.setDescription("Command for see all log with type");
command.setDefaultMemberPermissions(
  Discord.PermissionsBitField.Flags.ViewAuditLog,
);

const commandOptionType = new Discord.SlashCommandStringOption();
commandOptionType.setName("type");
commandOptionType.setDescription("Type log for logs with type");
commandOptionType.setChoices([
  {
    name: "JoinLeave",
    value: "join_leave",
  },
  {
    name: "Others",
    value: "others_log",
  },
]);
commandOptionType.setRequired(true);

const commandOptionPage = new Discord.SlashCommandIntegerOption();
commandOptionPage.setName("page");
commandOptionPage.setDescription("Page number");

command.addStringOption(commandOptionType);
command.addIntegerOption(commandOptionPage);

@Command(command)
class LoggerList {
  constructor(
    @UseEntity(JoinLeaveLog)
    private joinLeaveLog: Typeorm.Repository<JoinLeaveLog>,
    @UseEntity(OthersLog)
    private othersLog: Typeorm.Repository<OthersLog>,
  ) {}

  @IsExecutor()
  async call(
    core: Core,
    client: Discord.Client<true>,
    interaction: Discord.ChatInputCommandInteraction,
  ) {
    const type = interaction.options.getString("type");
    const page = interaction.options.getInteger("page") || 1;

    switch (type) {
      case "join_leave":
        return JoinLeaveList(
          await Pagination<JoinLeaveLog>(this.joinLeaveLog, page),
          page,
          await Count<JoinLeaveLog>(this.joinLeaveLog),
          interaction,
          core,
        );

      case "others_log":
        return OthersList(
          await Pagination<OthersLog>(this.othersLog, page),
          page,
          await Count<OthersLog>(this.othersLog),
          interaction,
          core,
        );
    }
  }
}

export = LoggerList;
