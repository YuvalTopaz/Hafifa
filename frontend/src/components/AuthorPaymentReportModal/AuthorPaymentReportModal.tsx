import type { AuthorPaymentReport } from "../../Types";

type Props = {
  report: AuthorPaymentReport | null;
  isLoading: boolean;
  onClose: () => void;
};

export function AuthorPaymentReportModal({
  report,
  isLoading,
  onClose,
}: Props) {
  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Payment Report</h5>

              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              {isLoading && <p>Loading report...</p>}

              {!isLoading && report && (
                <>
                  <h5>{report.author_name}</h5>

                  <p className="fw-bold">
                    Total payment: ${report.total_payment.toFixed(2)}
                  </p>

                  {report.books.length === 0 ? (
                    <p className="text-muted">No paid books found.</p>
                  ) : (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Book</th>
                          <th>Price</th>
                          <th>Times Borrowed</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {report.books.map((book) => (
                          <tr key={book.book_id}>
                            <td>{book.title}</td>
                            <td>${Number(book.price).toFixed(2)}</td>
                            <td>{book.borrow_count}</td>
                            <td>${Number(book.total).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}
