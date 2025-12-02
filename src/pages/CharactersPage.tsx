import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import CharacterCard from "../components/CharacterCard";
import { useCharacters } from "../hooks/useCharacters";
import Loading from "../components/Loading";
import CharacterNotFound from "../components/CharacterNotFound";

const CharactersPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useCharacters(query, page);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (data && page < data.info.pages) setPage((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rick and Morty Characters</h1>
      <SearchBar query={query} onChange={(value) => { setQuery(value); setPage(1); }} />

      {isLoading && <Loading />}
      {isError && <CharacterNotFound />}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data?.results.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", }}>
        <button onClick={handlePrev} disabled={page === 1}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: page === 1 ? "#e0e0e0" : "#fff",
            color: page === 1 ? "#888" : "#000",
            cursor: page === 1 ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}>
          ← Prev
        </button>
        <span
          style={{
            padding: "8px 16px",
          }}>
          Page {page} of {data?.info.pages || 1}
        </span>
        <button onClick={handleNext} disabled={page === (data?.info.pages || 1)}
          style={{
            marginLeft: "10px",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: page === data?.info.pages ? "#e0e0e0" : "#fff",
            color: page === data?.info.pages ? "#888" : "#000",
            cursor: page === data?.info.pages ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;
