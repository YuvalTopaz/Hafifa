import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class CustomerWallet extends Model {
  declare customer_id: string;
  declare balance: number;
}

CustomerWallet.init(
  {
    customer_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "customer_wallets",
    timestamps: false,
  },
);