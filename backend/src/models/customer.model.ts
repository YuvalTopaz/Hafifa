import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Customer extends Model {
  declare customer_id: string;
}

Customer.init(
  {
    customer_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "customers",
    timestamps: false,
  }
);