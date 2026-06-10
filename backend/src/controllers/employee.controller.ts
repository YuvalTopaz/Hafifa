import { Request, Response } from "express";
import { createEmployeeService } from "../services/employee.service";

export const createEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await createEmployeeService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "MISSING_FIELDS") {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      if (error.message === "ALREADY_EMPLOYEE") {
        return res.status(409).json({
          message: "User is already an employee",
        });
      }
    }

    return res.status(500).json({
      message: "Failed to create employee",
    });
  }
};