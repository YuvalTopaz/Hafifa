import { WalletRepository } from "../repositories/wallet.repository";

const walletRepository = new WalletRepository();

export class WalletService {
  async getWallet(customerId: string) {
    const wallet = await walletRepository.findByCustomerId(customerId);

    if (!wallet) {
      return walletRepository.createWallet(customerId);
    }

    return wallet;
  }

  async depositMoney(customerId: string, amount: number) {
    if (!amount || amount <= 0) {
      throw new Error("INVALID_AMOUNT");
    }

    return walletRepository.deposit(customerId, amount);
  }
}