export default function CatalogHeader() {
  return (
    <div className="card shadow-sm p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-1">Library Catalog</h2>
          <p className="text-muted mb-0">
            Track, manage, and explore your collection.
          </p>
        </div>

        <button className="btn btn-primary">
          Add Book
        </button>
      </div>
    </div>
  );
}