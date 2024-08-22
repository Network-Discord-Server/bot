import { Manifest } from "@zachary_masson/modular-core";

/*          Imports Mapping         */

// Commands
import Profile from "@modular(user)/commands/profile";
import Login from "@modular(user)/commands/login";
import Register from "@modular(user)/commands/register";

// Events

// ContextMenus
import profile from "@modular(user)/context_menus/user/profile";

// Buttons

// Entities
import { Network } from "@modular(user)/entities/network";
import { User } from "@modular(user)/entities/user";

const manifest: Manifest = new Manifest({
  name: "user",
  description: "Module for manage user",
  author: "Zachary Masson <contact@zacharymasson.com>",
  mappings: {
    commands: [Register, Login, Profile],
    events: [],
    context_menus: [profile],
    buttons: [],
    entities: [Network, User],
  },
});

export = manifest;
