import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Account extends Model {
  declare account_id: string;
  declare person_id: string;
  declare email: string;
  declare password: string;
}

Account.init(
  {
    account_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    person_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "accounts",
    timestamps: false,
  }
);