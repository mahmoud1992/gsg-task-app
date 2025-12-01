import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import CharacterCard from "../components/CharacterCard";
import { useCharacters } from "../hooks/useCharacters";

const CharactersPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { characters, loading, error, pages } = useCharacters(query, page);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < pages) setPage((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rick and Morty Characters</h1>
      <SearchBar query={query} onChange={(value) => { setQuery(value); setPage(1); }} />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={page === 1} style={{ marginRight: "10px" }}>
          Previous
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button onClick={handleNext} disabled={page === pages} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;
