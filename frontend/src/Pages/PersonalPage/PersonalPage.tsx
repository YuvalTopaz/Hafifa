import BorrowedBookCard from "../../components/BorrowedBookCard";
import { useLibraryDataContext } from "../../context/LibraryDataContext/useLibraryDataContext";

export default function PersonalPage() {
  const {
    myBorrows,
    myBorrowHistory,
    isLoading,
    error,
    returnBorrowById,
  } = useLibraryDataContext();

  const totalSpent = myBorrowHistory.reduce((total, borrow) => {
    return total + Number(borrow.Book?.price ?? 0);
  }, 0);

  async function handleReturn(borrowId: number, bookId: string) {
    try {
      await returnBorrowById(borrowId, bookId);
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

      {!isLoading && myBorrows.length === 0 ? (
        <p className="text-muted">You have no borrowed books.</p>
      ) : (
        <div className="row g-3">
          {myBorrows.map((borrow) => (
            <div key={borrow.borrow_id} className="col-12 col-md-6 col-lg-4">
              <BorrowedBookCard
                borrow={borrow}
                onReturn={() => handleReturn(borrow.borrow_id, borrow.book_id)}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}