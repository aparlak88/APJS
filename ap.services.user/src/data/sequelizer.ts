import { Sequelize } from "sequelize";
import { User } from "../data/entities/user";

const sequelize = new Sequelize(
  "freedb_ap.userdb",
  "freedb_ap.user",
  "5KQYWBD6qeP?hTq",
  {
    host: "sql.freedb.tech",
    dialect: "mysql",
  }
);

export class Sequelizer {
  async test(): Promise<string> {
    try {
      await sequelize.authenticate();
      return "Connection has been established successfully.";
    } catch (error) {
      return "Unable to connect to the database.";
    }
  }

  syncTables() {
    User.sync();
  }
}
