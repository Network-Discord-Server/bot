import { Core, Discord } from "@zachary_masson/modular-core";

class ErrorManager<Type> {
  private _interaction: any;
  private _core: Core;

  constructor(interaction: Type, core: Core) {
    this._interaction = interaction;
    this._core = core;
  }

  send(message: string, ephemeral?: boolean): void {
    const embed = new Discord.EmbedBuilder();
    embed.setColor(this._core.config.design.colors.error);
    embed.setDescription(message);

    return this._interaction.reply({
      ephemeral: ephemeral || false,
      embeds: [embed],
    });
  }
}

export = ErrorManager;
