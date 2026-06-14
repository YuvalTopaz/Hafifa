import { Customer, CustomerWallet } from "../models";
import { sequelize } from "../config/database";

export class WalletRepository {
  async findByCustomerId(customerId: string) {
    return CustomerWallet.findOne({
      where: {
        customer_id: customerId,
      },
    });
  }

  async createWallet(customerId: string) {
    return CustomerWallet.create({
      customer_id: customerId,
      balance: 0,
    });
  }

  async deposit(customerId: string, amount: number) {
    return sequelize.transaction(async (transaction) => {
      const customer = await Customer.findOne({
        where: {
          customer_id: customerId,
          is_active: true,
        },
        transaction,
      });

      if (!customer) {
        throw new Error("CUSTOMER_NOT_FOUND");
      }

      let wallet = await CustomerWallet.findOne({
        where: {
          customer_id: customerId,
        },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!wallet) {
        wallet = await CustomerWallet.create(
          {
            customer_id: customerId,
            balance: 0,
          },
          { transaction },
        );
      }

      const currentBalance = Number(wallet.balance);

      await wallet.update(
        {
          balance: currentBalance + amount,
        },
        { transaction },
      );

      return wallet;
    });
  }
}