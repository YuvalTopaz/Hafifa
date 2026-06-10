import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class BookBorrow extends Model {
  declare borrow_id: number;
  declare borrower_id: string;
  declare book_id: string;
  declare borrow_date: Date;
  declare return_date: Date | null;
}

BookBorrow.init(
  {
    borrow_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    borrower_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borrow_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "book_borrows",
    timestamps: false,
  }
);