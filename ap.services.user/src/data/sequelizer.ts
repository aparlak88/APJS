import { Sequelize } from "sequelize";
import { UserEntity } from "./entities/userEntity";
var config = require("../config.json");

const sequelize = new Sequelize(
  config.dbServer.dbName,
  config.dbServer.username,
  config.dbServer.password,
  {
    host: config.dbServer.host,
    dialect: config.dbServer.dialect,
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
    UserEntity.sync();
  }
}
