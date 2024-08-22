import {
  Discord,
  IsExecutor,
  Command,
  Core,
  UseEntity,
  Typeorm,
} from "@zachary_masson/modular-core";
import { User } from "@modular(user)/entities/user";
import Config from "@modular(user)/config.json";
import ErrorManager from "@modular(error_manager)/index";

const command = new Discord.SlashCommandBuilder();
command.setName("login");
command.setDescription("this command allows you to connect");

@Command(command)
class Login {
  constructor(
    @UseEntity(User) private userRepository: Typeorm.Repository<User>,
  ) {}

  @IsExecutor()
  async call(
    core: Core,
    client: Discord.Client<true>,
    interaction: Discord.ChatInputCommandInteraction,
  ) {
    const error_manager = new ErrorManager<Discord.ChatInputCommandInteraction>(
      interaction,
      core,
    );

    if (!Config.commands.register.channels.includes(interaction.channel.id))
      return error_manager.send(
        `You cannot execute this command in the “${interaction.channel.name}” room.`,
        true,
      );

    const user = await this.userRepository.findOne({
      where: { discord_id: interaction.user.id },
    });

    if (!user)
      return error_manager.send(
        `If you don't have an account, please register. "/register \`prenom:\` \`nom:\` \`age:\`"`,
        true,
      );

    const role = await interaction.guild.roles.fetch(
      Config.commands.register.roles.member,
    );

    const member: Discord.GuildMember =
      interaction.member as Discord.GuildMember;

    try {
      await member.setNickname(`${user.firstname} ${user.lastname}`);
    } catch (e) {}

    await member.roles.add(role);

    await interaction.user.send({
      content: "You have been correctly connected !",
    });

    return interaction.reply({
      content: ".",
      ephemeral: true,
    });
  }
}

export = Login;
