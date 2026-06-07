import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Person extends Model {
  declare id: number;
  declare first_name: string;
  declare last_name: string;
  declare birth_date: Date;
}

Person.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "person",
  }
);