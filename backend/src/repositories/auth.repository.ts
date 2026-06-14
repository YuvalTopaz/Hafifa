import { Account, Person, Employee, Customer } from "../models";
import { sequelize } from "../config/database";

export const findAccountByEmail = async (email: string) => {
  return Account.findOne({
    where: { email },
    include: [{ model: Person }],
  });
};

export const findEmployeeByPersonId = async (personId: string) => {
  return Employee.findByPk(personId);
};

export const findActiveCustomerByPersonId = async (personId: string) => {
  return Customer.findOne({
    where: {
      customer_id: personId,
      is_active: true,
    },
  });
};

export const createCustomerUser = async (data: {
  personId: string;
  accountId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
}) => {
  return sequelize.transaction(async (transaction) => {
    const person = await Person.create(
      {
        person_id: data.personId,
        first_name: data.firstName,
        last_name: data.lastName,
        birth_date: data.birthDate,
      },
      { transaction }
    );

    const account = await Account.create(
      {
        account_id: data.accountId,
        person_id: data.personId,
        email: data.email,
        password: data.password,
      },
      { transaction }
    );

    const customer = await Customer.create(
      {
        customer_id: data.personId,
        is_active: true,
      },
      { transaction }
    );

    return { person, account, customer };
  });
};