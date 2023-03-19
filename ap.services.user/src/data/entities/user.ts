import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize(
  "freedb_ap.userdb",
  "freedb_ap.user",
  "5KQYWBD6qeP?hTq",
  {
    host: "sql.freedb.tech",
    dialect: "mysql",
  }
);

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
      },
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      validate: {
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 4,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 4,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize }
);
