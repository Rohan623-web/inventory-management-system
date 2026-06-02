import { FiSearch } from "react-icons/fi";

function SearchBar({
  value,
  onChange,
  placeholder,
  count,
}) {
  return (
    <div className="search-container">
      <div className="search-left">
        <FiSearch className="search-icon" />

        <input
          type="text"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="search-input"
        />
      </div>

      <div className="search-count">
        {count} Products
      </div>
    </div>
  );
}

export default SearchBar;