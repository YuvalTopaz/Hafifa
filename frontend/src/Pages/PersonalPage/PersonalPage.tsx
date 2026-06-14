import BorrowedBookCard from "../../components/BorrowedBookCard";
import { useMyBorrows } from "../../api/hooks";
import { useAuth } from "../../context/useAuth";

export default function PersonalPage() {
  const { user } = useAuth();

  const { borrows, isLoading, error, returnBorrow } = useMyBorrows(
    user?.person_id,
  );

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

      {isLoading && <p>Loading...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!isLoading && borrows.length === 0 ? (
        <p className="text-muted">You have no borrowed books.</p>
      ) : (
        <div className="row g-3">
          {borrows.map((borrow) => (
            <div key={borrow.borrow_id} className="col-12 col-md-6 col-lg-4">
              <BorrowedBookCard borrow={borrow} onReturn={handleReturn} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
