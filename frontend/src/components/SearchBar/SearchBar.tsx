type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: Props) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text bg-white">
        <i className="bi bi-search" />
      </span>

      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}