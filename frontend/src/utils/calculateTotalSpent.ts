import type { BorrowedBook } from "../Types";

export function calculateTotalSpent(borrows: BorrowedBook[]) {
  return borrows.reduce((total, borrow) => {
    return total + Number(borrow.Book?.price ?? 0);
  }, 0);
}