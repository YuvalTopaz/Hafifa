import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Author extends Model {
  declare id: string;
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "lib_authors",
    timestamps: false,
  }
);