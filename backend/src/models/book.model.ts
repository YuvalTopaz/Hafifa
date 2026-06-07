import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Book extends Model {
  declare book_id: number;
  declare title: string;
  declare author_id: number;
  declare is_borrowed: boolean;
  declare release_date: Date;
}

Book.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_borrowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "lib_books",
    timestamps: false,
  }
);