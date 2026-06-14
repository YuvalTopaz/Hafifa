import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Customer extends Model {
  declare customer_id: string;
  declare is_active: boolean;
}

Customer.init(
  {
    customer_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "customers",
    timestamps: false,
  }
);