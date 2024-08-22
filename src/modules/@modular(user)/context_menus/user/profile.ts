import {
  Discord,
  IsExecutor,
  Context_menu,
  Core,
  UseEntity,
  Typeorm,
} from "@zachary_masson/modular-core";
import { User } from "@modular(user)/entities/user";
import { ProfileSee } from "@modular(user)/commands/profile/see";

const contextMenu = new Discord.ContextMenuCommandBuilder();
contextMenu.setName("profile");
contextMenu.setType(Discord.ApplicationCommandType.User);

@Context_menu(contextMenu)
class Profile {
  constructor(
    @UseEntity(User) private userRepository: Typeorm.Repository<User>,
  ) {}

  @IsExecutor()
  call(
    core: Core,
    client: Discord.Client<true>,
    interaction: Discord.UserContextMenuCommandInteraction,
  ) {
    return ProfileSee(core, client, interaction, this.userRepository);
  }
}

export = Profile;
