import "dotenv/config";

import { Colors, Modular } from "@zachary_masson/modular-core";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);
dayjs.locale("fr");

// Imports Modules
import ErrorManager from "@modular(error_manager)/module.main";
import User from "@modular(user)/module.main";
import Challenges from "@modular(challenges)/module.main";
import Strings from "@modular(strings)/module.main";
import Logger from "@modular(logger)/module.main";

async function __main__() {
  const client = new Modular({
    token: process.env.TOKEN,
    dev: JSON.parse(process.env.DEV) || false,
    database: {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: 5432,
    },
    design: {
      colors: {
        primary: Colors.Magenta,
        secondary: Colors.Grey,
        info: Colors.Blue,
        warning: Colors.Yellow,
        error: Colors.Red,
      },
    },
  });

  // Use Module
  await client.useModule(ErrorManager);
  await client.useModule(User);
  await client.useModule(Challenges);
  await client.useModule(Strings);
  await client.useModule(Logger);

  await client.login();
}

__main__();
