import type { Core, Discord } from "@zachary_masson/modular-core";
import dayjs from "dayjs";

// from other modules
import { toPascalCase } from "@modular(strings)/fonctions/toPascalCase";

import { JoinLeaveLog } from "@modular(logger)/entities/join_leave_log";
import { EmbedList } from "@modular(logger)/functions/embeds/list";

import Config from "@modular(logger)/config.json";

export async function JoinLeaveList(
  data: JoinLeaveLog[],
  page: number,
  count: number,
  interaction: Discord.ChatInputCommandInteraction,
  core: Core,
) {
  const fields: Discord.EmbedField[] = [];

  for (const row of data) {
    fields.push({
      name: `Type : ${toPascalCase(row.type)}`,
      value: `
        \` User \` : <@${row.discord_id}>
        \` Guild \` : \` ${row.guild_name} \`
        \` Time \` : \` ${dayjs(row.insert_at).format("YYYY-MM-DD HH:mm:ss")} \`
        \` ${dayjs(row.insert_at).fromNow()} \`\n
      `,
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
