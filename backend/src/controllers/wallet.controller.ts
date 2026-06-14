import { Request, Response } from "express";
import { WalletService } from "../services/wallet.service";

const walletService = new WalletService();

type WalletParams = {
  customerId: string;
};

export const getWallet = async (
  req: Request<WalletParams>,
  res: Response,
) => {
  try {
    const { customerId } = req.params;

    const wallet = await walletService.getWallet(customerId);

    return res.json(wallet);
  } catch {
    return res.status(500).json({
      message: "Failed to get wallet",
    });
  }
};

export const depositMoney = async (
  req: Request<WalletParams>,
  res: Response,
) => {
  try {
    const { customerId } = req.params;
    const { amount } = req.body;

    const wallet = await walletService.depositMoney(
      customerId,
      Number(amount),
    );

    return res.json(wallet);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "INVALID_AMOUNT") {
        return res.status(400).json({
          message: "Amount must be greater than 0",
        });
      }

      if (error.message === "CUSTOMER_NOT_FOUND") {
        return res.status(404).json({
          message: "Customer not found",
        });
      }
    }

    return res.status(500).json({
      message: "Failed to deposit money",
    });
  }
};