import { Request, Response } from "express";
import {
  loginService,
  registerCustomerService,
} from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body.email, req.body.password);
    return res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "MISSING_FIELDS") {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      if (error.message === "INVALID_CREDENTIALS") {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      if (error.message === "NO_VALID_ROLE") {
        return res.status(403).json({
          message: "User has no valid active role",
        });
      }
    }

    return res.status(500).json({
      message: "Login failed",
    });
  }
};

export const registerCustomer = async (req: Request, res: Response) => {
  try {
    const result = await registerCustomerService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_EXISTS") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      message: "Registration failed",
    });
  }
};