import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

const customerService = new CustomerService();

export const getAll = async (req: Request, res: Response) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      dbError: error.parent?.message,
    });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await customerService.deleteCustomer(req.params.customerId as string);

    res.status(204).send();
  } catch (error: any) {
    if (error.message === "Customer not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({
      message: error.message,
      dbError: error.parent?.message,
    });
  }
};