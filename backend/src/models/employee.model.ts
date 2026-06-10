import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Employee extends Model {
  declare employee_id: string;
}

Employee.init(
  {
    employee_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "employees",
    timestamps: false,
  }
);