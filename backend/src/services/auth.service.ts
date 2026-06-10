import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  findAccountByEmail,
  findEmployeeByPersonId,
  findCustomerByPersonId,
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
  const customer = await findCustomerByPersonId(account.person_id);

  let role: "employee" | "customer";

  if (employee) {
    role = "employee";
  } else if (customer) {
    role = "customer";
  } else {
    throw new Error("NO_VALID_ROLE");
  }

  const token = jwt.sign(
    {
      person_id: account.person_id,
      role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      person_id: account.person_id,
      email: account.email,
      role,
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