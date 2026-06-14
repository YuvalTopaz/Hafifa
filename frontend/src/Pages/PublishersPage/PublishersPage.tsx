import { useState } from "react";
import { useAuthors } from "../../api/hooks";

export default function PublishersPage() {
  const { authors, isLoading, error, addAuthor, removeAuthor } = useAuthors();

  const [showModal, setShowModal] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert("Author already exists");
      } else {
        alert(err.response?.data?.message || "Failed to create author");
      }
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
        <div className="row g-3">
          {authors.map((author) => (
            <div key={author.author_id} className="col-12 col-md-6 col-lg-4">
              <div className="card p-3 shadow-sm">
                <h5>
                  {author.first_name} {author.last_name}
                </h5>

                <p className="text-muted">Birth date: {author.birth_date}</p>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(author.author_id)}
                >
                  Delete Author
                </button>
              </div>
            </div>
          ))}
        </div>
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
    </main>
  );
}
