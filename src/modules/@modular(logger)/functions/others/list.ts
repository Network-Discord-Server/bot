import type { Core, Discord } from "@zachary_masson/modular-core";

// from other modules

import { OthersLog } from "@modular(logger)/entities/others_log";
import { EmbedList } from "@modular(logger)/functions/embeds/list";

import Config from "@modular(logger)/config.json";

export async function OthersList(
  data: OthersLog[],
  page: number,
  count: number,
  interaction: Discord.ChatInputCommandInteraction,
  core: Core,
) {
  const fields: Discord.EmbedField[] = [];

  for (const row of data) {
    let value = "";
    for (const meta of Object.keys(row.data)) {
      value += ` \` ${meta} \` : \` ${row.data[meta]} \``;
    }
    fields.push({
      name: `Type : ${row.type}`,
      value,
      inline: false,
    });
  }

  const pages = parseInt((count / Config.list.amount).toFixed(0));

  return EmbedList(
    fields,
    page,
    pages === 0 ? 1 : pages,
    count,
    core,
    interaction,
  );
}
