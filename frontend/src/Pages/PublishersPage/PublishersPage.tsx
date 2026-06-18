import { useState } from "react";
import type { AuthorPaymentReport } from "../../Types";
import { AuthorPaymentReportModal } from "../../components/AuthorPaymentReportModal";
import EntityCard from "../../components/EntityCard";
import { SearchBar } from "../../components/SearchBar";
import { useLibraryDataContext } from "../../context/LibraryDataContext/useLibraryDataContext";

export default function PublishersPage() {
  const {
    authors,
    isLoading,
    error,
    addAuthor,
    removeAuthor,
    loadAuthorPaymentReport,
  } = useLibraryDataContext();

  const [showModal, setShowModal] = useState(false);
  const [report, setReport] = useState<AuthorPaymentReport | null>(null);
  const [isReportLoading, setIsReportLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  const filteredAuthors = authors.filter((author) => {
    const fullName = `${author.first_name} ${author.last_name}`;
    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await addAuthor({
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
      });

      setShowModal(false);
      setFirstName("");
      setLastName("");
      setBirthDate("");
    } catch {
      alert("Failed to create author");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(authorId: string) {
    try {
      await removeAuthor(authorId);
    } catch {
      alert("Failed to delete author");
    }
  }

  async function handleReport(authorId: string) {
    try {
      setIsReportLoading(true);

      const loadedReport = await loadAuthorPaymentReport(authorId);
      setReport(loadedReport);
    } catch {
      alert("Failed to load payment report");
    } finally {
      setIsReportLoading(false);
    }
  }

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Authors</h1>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Author
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!isLoading && authors.length === 0 ? (
        <p className="text-muted">No authors found.</p>
      ) : (
        <>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search authors..."
          />

          {filteredAuthors.length === 0 ? (
            <p className="text-muted">No authors match your search.</p>
          ) : (
            <div className="row g-3">
              {filteredAuthors.map((author) => (
                <div
                  key={author.author_id}
                  className="col-12 col-md-6 col-lg-4"
                >
                  <EntityCard
                    title={`${author.first_name} ${author.last_name}`}
                    actions={
                      <>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleReport(author.author_id)}
                        >
                          Payment Report
                        </button>

                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(author.author_id)}
                        >
                          Delete Author
                        </button>
                      </>
                    }
                  >
                    <p className="text-muted mb-0">
                      Birth date: {author.birth_date}
                    </p>
                  </EntityCard>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {showModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Create Author</h5>

                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    />
                  </div>

                  <div className="modal-body">
                    <input
                      className="form-control mb-3"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />

                    <input
                      className="form-control mb-3"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />

                    <input
                      className="form-control"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating..." : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {(report || isReportLoading) && (
        <AuthorPaymentReportModal
          report={report}
          isLoading={isReportLoading}
          onClose={() => setReport(null)}
        />
      )}
    </main>
  );
}