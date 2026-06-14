import BorrowedBookCard from "../../components/BorrowedBookCard";
import { useCustomerBorrowHistory, useMyBorrows } from "../../api/hooks";
import { useAuth } from "../../context/AuthContext/useAuth";

export default function PersonalPage() {
  const { user } = useAuth();

  const {
    borrows: activeBorrows,
    isLoading,
    error,
    returnBorrow,
  } = useMyBorrows(user?.person_id);

  const { borrows: borrowHistory } = useCustomerBorrowHistory(user?.person_id);

  const totalSpent = borrowHistory.reduce((total, borrow) => {
    return total + Number(borrow.Book?.price ?? 0);
  }, 0);

  async function handleReturn(borrowId: string) {
    try {
      await returnBorrow(borrowId);
    } catch {
      alert("Failed to return book");
    }
  }

  return (
    <main className="container py-4">
      <h1 className="mb-4">My Borrowed Books</h1>

      <div className="alert alert-secondary">
        Total money spent: ₪{totalSpent.toFixed(2)}
      </div>

      {isLoading && <p>Loading...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!isLoading && activeBorrows.length === 0 ? (
        <p className="text-muted">You have no borrowed books.</p>
      ) : (
        <div className="row g-3">
          {activeBorrows.map((borrow) => (
            <div key={borrow.borrow_id} className="col-12 col-md-6 col-lg-4">
              <BorrowedBookCard borrow={borrow} onReturn={handleReturn} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}