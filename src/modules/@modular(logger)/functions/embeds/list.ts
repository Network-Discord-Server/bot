import { Core, Discord } from "@zachary_masson/modular-core";
import ErrorManager from "@modular(error_manager)/index";

export function EmbedList(
  fields: Discord.EmbedField[],
  page: number,
  pages: number,
  count: number,
  core: Core,
  interaction: Discord.ChatInputCommandInteraction,
) {
  const error_manager = new ErrorManager<Discord.ChatInputCommandInteraction>(
    interaction,
    core,
  );

  if (!fields[0]) return error_manager.send("Not Data found !", true);

  const embed = new Discord.EmbedBuilder();
  embed.setColor("Blue");
  embed.setFields(...fields);
  embed.setDescription(
    `\` Pages \` : \` ${page}/${pages} \` | \` Logs \` : \` ${fields.length} \` | \` Total Logs \` : \` ${count} \``,
  );

  return interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });
}
