import { randomUUID } from "crypto";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Person extends Model {
  declare person_id: string;
  declare first_name: string;
  declare last_name: string;
  declare birth_date: Date;
}

Person.init(
  {
    person_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => randomUUID(),
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.TEXT,
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
    timestamps: false,
  }
);