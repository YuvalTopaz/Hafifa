import { randomUUID } from "crypto";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Book extends Model {
  declare book_id: string;
  declare title: string;
  declare author_id: string;
  declare price: number;
  declare is_borrowed: boolean;
  declare is_active: boolean;
  declare release_date: Date | null;
}

Book.init(
  {
    book_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => randomUUID(),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    is_borrowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "books",
    timestamps: false,
  }
);