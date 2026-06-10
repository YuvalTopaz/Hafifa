import bcrypt from "bcrypt";
import crypto from "crypto";

import {
  findAccountByEmail,
  findEmployeeById,
  createEmployeeForExistingPerson,
  createNewEmployeeUser,
} from "../repositories/employee.repository";

export const createEmployeeService = async (data: {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
}) => {
  if (
    !data.firstName ||
    !data.lastName ||
    !data.birthDate ||
    !data.email ||
    !data.password
  ) {
    throw new Error("MISSING_FIELDS");
  }

  const existingAccount = await findAccountByEmail(data.email);

  if (existingAccount) {
    const existingEmployee = await findEmployeeById(
      existingAccount.person_id
    );

    if (existingEmployee) {
      throw new Error("ALREADY_EMPLOYEE");
    }

    await createEmployeeForExistingPerson(existingAccount.person_id);

    return {
      message: "Existing user added as employee",
    };
  }

  const personId = crypto.randomUUID();
  const accountId = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(data.password, 10);

  await createNewEmployeeUser({
    personId,
    accountId,
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    email: data.email,
    passwordHash,
  });

  return {
    message: "Employee created successfully",
  };
};