import { useState } from "react";
import type { Author, CreateBookDto } from "../../Types";

type Props = {
  authors: Author[];
  onAddBook: (book: CreateBookDto) => Promise<unknown>;
};

export default function AddBookModal({
  authors,
  onAddBook,
}: Props) {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !authorId) {
      alert("Title and author are required");
      return;
    }

    try {
      await onAddBook({
        title,
        author_id: authorId,
        price: price ? Number(price) : undefined,
        release_date: releaseDate || null,
      });

      setTitle("");
      setAuthorId("");
      setPrice("");
      setReleaseDate("");

      const modal = document.getElementById("addBookModal");

      if (modal) {
        (
          window as Window & {
            bootstrap?: {
              Modal: {
                getInstance(
                  element: HTMLElement,
                ): { hide(): void } | null;
              };
            };
          }
        ).bootstrap?.Modal.getInstance(modal)?.hide();
      }
    } catch {
      alert("Failed to create book");
    }
  }

  return (
    <div className="modal fade" id="addBookModal" tabIndex={-1}>
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Add Book</h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title</label>

              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Author</label>

              <select
                className="form-select"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option value="">Select Author</option>

                {authors.map((author) => (
                  <option
                    key={author.author_id}
                    value={author.author_id}
                  >
                    {author.first_name} {author.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>

              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Release Date</label>

              <input
                type="date"
                className="form-control"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}