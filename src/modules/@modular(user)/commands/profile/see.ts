import { Core, Discord, Typeorm } from "@zachary_masson/modular-core";
import type { User } from "@modular(user)/entities/user";
import ErrorManager from "@modular(error_manager)/index";
import dayjs from "dayjs";

export async function ProfileSee(
  core: Core,
  client: Discord.Client<true>,
  interaction:
    | Discord.ChatInputCommandInteraction
    | Discord.UserContextMenuCommandInteraction,
  userRepository: Typeorm.Repository<User>,
) {
  const error_manager = new ErrorManager<
    | Discord.ChatInputCommandInteraction
    | Discord.UserContextMenuCommandInteraction
  >(interaction, core);

  const memberSelect = interaction.options.getUser("member");

  console.log(userRepository);

  let user: User;

  if (memberSelect)
    user = await userRepository.findOne({
      where: { discord_id: memberSelect.id },
    });
  else if (interaction.isUserContextMenuCommand())
    user = await userRepository.findOne({
      where: { discord_id: interaction.targetId },
    });
  else
    user = await userRepository.findOne({
      where: { discord_id: interaction.user.id },
    });

  if (!user) return error_manager.send("The member has no profile yet !", true);

  const embed = new Discord.EmbedBuilder();
  embed.setColor(core.config.design.colors.primary);
  embed.setDescription(`
   \` Name \` : \` ${user.firstname} ${user.lastname} \`
   \` Age \` : \` ${user.age} ans \`
   \` Work \` : \` ${user.work ? user.work : "Non définie"} \`
   \` Langages \` : \` ${user.languages ? user.languages.join(" ,") : "Non définie"} \`
   \` Technologies \` : \` ${user.technologies ? user.technologies.join(" ,") : "Non définie"} \`
   \` Join At \` : \` ${dayjs(user.insert_at).fromNow()} \`
   \` Last Update \` : \` ${dayjs(user.updated_at).fromNow()} \`
  `);

  const member: Discord.GuildMember = await interaction.guild.members.fetch({
    user: user.discord_id,
  });

  embed.setThumbnail(member.user.displayAvatarURL());

  return interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });
}
