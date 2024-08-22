import {
  Discord,
  IsExecutor,
  Command,
  Core,
  UseEntity,
  Typeorm,
} from "@zachary_masson/modular-core";

// SubCommand
import { ProfileSee } from "@modular(user)/commands/profile/see";
import { User } from "@modular(user)/entities/user";

const command = new Discord.SlashCommandBuilder();
command.setName("profile");
command.setDescription("This command allows you to view/manage your profile");

const member = new Discord.SlashCommandUserOption();
member.setName("member");
member.setDescription("Please enter a member");

const subCommand = new Discord.SlashCommandSubcommandBuilder();
subCommand.setName("see");
subCommand.setDescription("This action allows you to view a member's profile.");
subCommand.addUserOption(member);

command.addSubcommand(subCommand);

@Command(command)
class Profile {
  constructor(
    @UseEntity(User) private userRepository: Typeorm.Repository<User>,
  ) {}

  @IsExecutor()
  call(
    core: Core,
    client: Discord.Client<true>,
    interaction: Discord.ChatInputCommandInteraction,
  ) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "see":
        return ProfileSee(core, client, interaction, this.userRepository);
    }
  }
}

export = Profile;
