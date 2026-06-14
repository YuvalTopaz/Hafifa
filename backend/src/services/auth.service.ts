import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Person } from "../models";
import {
  findAccountByEmail,
  findEmployeeByPersonId,
  findActiveCustomerByPersonId,
  createCustomerUser,
} from "../repositories/auth.repository";

export const loginService = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("MISSING_FIELDS");
  }

  const account = await findAccountByEmail(email);

  if (!account) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isPasswordValid = await bcrypt.compare(password, account.password);

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const employee = await findEmployeeByPersonId(account.person_id);
  const activeCustomer = await findActiveCustomerByPersonId(account.person_id);

  const isEmployee = !!employee;
  const isCustomer = !!activeCustomer;
  const isActiveCustomer = !!activeCustomer;

  if (!isEmployee && !isCustomer) {
    throw new Error("NO_VALID_ROLE");
  }

  const person = account.get("Person") as Person | null;

  if (!person) {
    throw new Error("PERSON_NOT_FOUND");
  }

  const token = jwt.sign(
    {
      person_id: account.person_id,
      isEmployee,
      isCustomer,
      isActiveCustomer,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  return {
    token,
    user: {
      person_id: account.person_id,
      email: account.email,
      first_name: person.first_name,
      last_name: person.last_name,
      birth_date: person.birth_date,
      isEmployee,
      isCustomer,
      isActiveCustomer,
    },
  };
};

export const registerCustomerService = async (data: {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
}) => {
  const existingAccount = await findAccountByEmail(data.email);

  if (existingAccount) {
    throw new Error("EMAIL_EXISTS");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const personId = crypto.randomUUID();
  const accountId = crypto.randomUUID();

  await createCustomerUser({
    personId,
    accountId,
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    email: data.email,
    password: passwordHash,
  });

  return {
    message: "Customer created successfully",
  };
};
