import React, { FC } from "react";

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ query, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search characters..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "10px",
        width: "100%",
        maxWidth: "400px",
        marginBottom: "20px",
        fontSize: "16px",
      }}
    />
  );
};

export default SearchBar;
