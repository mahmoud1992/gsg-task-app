import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import CharacterCard from "../components/CharacterCard";
import { useCharacters } from "../hooks/useCharacters";
import Loading from "../components/Loading";
import CharacterNotFound from "../components/CharacterNotFound";

const CharactersPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isError } = useCharacters(query, page);

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

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={page === 1} style={{ marginRight: "10px" }}>
          Previous
        </button>
        <span>
          Page {page} of {data?.info.pages || 1}
        </span>
        <button onClick={handleNext} disabled={page === (data?.info.pages || 1)} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;
