import { useState } from "react";
import {
  createEmployee,
  login,
  registerCustomer,
} from "./api";

import type {
  CreateCustomerDto,
  CreateEmployeeDto,
} from "../Types";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loginUser(email: string, password: string) {
    try {
      setIsLoading(true);
      setError(null);

      return await login(email, password);
    } catch {
      setError("Login failed");
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    loginUser,
    isLoading,
    error,
  };
}

export function useRegisterCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(customer: CreateCustomerDto) {
    try {
      setIsLoading(true);
      setError(null);

      return await registerCustomer(customer);
    } catch {
      setError("Registration failed");
      throw new Error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    register,
    isLoading,
    error,
  };
}

export function useCreateEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addEmployee(employee: CreateEmployeeDto) {
    try {
      setIsLoading(true);
      setError(null);

      return await createEmployee(employee);
    } catch {
      setError("Failed to create employee");
      throw new Error("Failed to create employee");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    addEmployee,
    isLoading,
    error,
  };
}