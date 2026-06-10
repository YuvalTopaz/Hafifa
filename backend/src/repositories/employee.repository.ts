import { Account, Employee, Person } from "../models";
import { sequelize } from "../config/database";

export const findAccountByEmail = async (email: string) => {
  return Account.findOne({
    where: { email },
  });
};

export const findEmployeeById = async (personId: string) => {
  return Employee.findByPk(personId);
};

export const createEmployeeForExistingPerson = async (personId: string) => {
  return Employee.create({
    employee_id: personId,
  });
};

export const createNewEmployeeUser = async (data: {
  personId: string;
  accountId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  passwordHash: string;
}) => {
  return sequelize.transaction(async (transaction) => {
    await Person.create(
      {
        person_id: data.personId,
        first_name: data.firstName,
        last_name: data.lastName,
        birth_date: data.birthDate,
      },
      { transaction }
    );

    await Account.create(
      {
        account_id: data.accountId,
        person_id: data.personId,
        email: data.email,
        password: data.passwordHash,
      },
      { transaction }
    );

    await Employee.create(
      {
        employee_id: data.personId,
      },
      { transaction }
    );
  });
};