import type { Author } from "../../Types";

type Props = {
  author: Author;
  onDelete: (authorId: string) => void;
  onReport: (authorId: string) => void;
};

export function AuthorCard({ author, onDelete, onReport }: Props) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card p-3 shadow-sm">
        <h5>
          {author.first_name} {author.last_name}
        </h5>

        <p className="text-muted">Birth date: {author.birth_date}</p>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={() => onReport(author.author_id)}
          >
            Payment Report
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={() => onDelete(author.author_id)}
          >
            Delete Author
          </button>
        </div>
      </div>
    </div>
  );
}
