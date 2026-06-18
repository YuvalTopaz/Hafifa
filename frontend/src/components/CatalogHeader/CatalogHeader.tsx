import { useState } from "react";
import type { Author, CreateBookDto } from "../../Types";
import AddBookModal from "../AddBookModal";

type Props = {
  authors: Author[];
  onAddBook: (book: CreateBookDto) => Promise<unknown>;
};

export default function CatalogHeader({ authors, onAddBook }: Props) {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  return (
    <>
      <div className="card shadow-sm p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="mb-1">Library Catalog</h2>

            <p className="text-muted mb-0">
              Track, manage, and explore your collection.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsAddBookModalOpen(true)}
          >
            Add Book
          </button>
        </div>
      </div>

      <AddBookModal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        authors={authors}
        onAddBook={onAddBook}
      />
    </>
  );
}
