import {
  Command,
  Core,
  Discord,
  IsExecutor,
  Typeorm,
  UseEntity,
} from "@zachary_masson/modular-core";

import Config from "@modular(user)/config.json";
import ErrorManager from "@modular(error_manager)/index";
import { User } from "@modular(user)/entities/user";

const command = new Discord.SlashCommandBuilder();
command.setName("register");
command.setDescription("For u register");

const prenom = new Discord.SlashCommandStringOption();
prenom.setName("prenom");
prenom.setDescription("Please enter your first name !");
prenom.setRequired(true);

const nom = new Discord.SlashCommandStringOption();
nom.setName("nom");
nom.setDescription("Please enter your last name !");
nom.setRequired(true);

const age = new Discord.SlashCommandIntegerOption();
age.setName("age");
age.setDescription("Please enter your age !");
age.setRequired(true);

command.addStringOption(prenom);
command.addStringOption(nom);
command.addIntegerOption(age);

@Command(command)
class Register {
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

    const firstname = interaction.options.getString("prenom");
    const lastname = interaction.options.getString("nom");
    const age = interaction.options.getInteger("age");

    if (!Config.commands.register.channels.includes(interaction.channel.id))
      return error_manager.send(
        `You cannot execute this command in the “${interaction.channel.name}” room.`,
        true,
      );

    if (
      await this.userRepository.findOne({
        where: { discord_id: interaction.user.id },
      })
    )
      return error_manager.send(
        `An error has occurred, you are already registered. `,
        true,
      );

    const user = this.userRepository.create({
      discord_id: interaction.user.id,
      firstname,
      lastname,
      age,
      username: interaction.user.username,
    });

    await this.userRepository.save(user);

    const role = await interaction.guild.roles.fetch(
      Config.commands.register.roles.member,
    );

    const member: Discord.GuildMember =
      interaction.member as Discord.GuildMember;

    try {
      await member.setNickname(`${firstname} ${lastname}`);
    } catch (e) {}

    await member.roles.add(role);

    await interaction.user.send({
      content: "You have correctly registered !",
    });

    return interaction.reply({
      content: ".",
      ephemeral: true,
    });
  }
}

export = Register;
