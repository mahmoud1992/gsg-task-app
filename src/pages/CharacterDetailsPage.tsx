import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import CharacterNotFound from "../components/CharacterNotFound";

interface CharacterDetails {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
}

interface Episode {
  id: number;
  name: string;
  episode: string;
}
const fetchCharacter = async (id: string) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error("Character not found");
  return res.json();
}
const fetchEpisode = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Episode not found");
  return res.json();
};

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: character, isLoading, isError } = useQuery<CharacterDetails,
    Error>({
      queryKey: ["character", id],
      queryFn: () => fetchCharacter(id!)
    })
  const episodeQueries = useQuery<Episode[], Error>({
    queryKey: ["episodes", character?.episode],
    queryFn: async () => {
      if (!character) return [];
      return Promise.all(character.episode.map(fetchEpisode));
    },
    enabled: !!character,
  });
  // const [character, setCharacter] = useState<CharacterDetails | null>(null);
  // const [episodes, setEpisodes] = useState<Episode[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  if (isLoading || episodeQueries.isLoading) return <Loading />
  if (isError || !character) return <CharacterNotFound />;

  // useEffect(() => {
  //   const fetchCharacter = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  //       if (!response.ok) throw new Error("Character not found");
  //       const data: CharacterDetails = await response.json();
  //       setCharacter(data);

  //       // Fetch episodes
  //       const episodePromises = data.episode.map((url) => fetch(url).then((res) => res.json()));
  //       const episodesData: Episode[] = await Promise.all(episodePromises);
  //       setEpisodes(episodesData);
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCharacter();
  // }, [id]);

  // if (loading) return <p>Loading...</p>;
  // if (error || !character) return <p>{error || "Character not found"}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to Characters</Link>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} style={{ borderRadius: "8px", maxWidth: "300px" }} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>

      <h2>Episodes:</h2>
      <ul>
        {episodeQueries.data?.map((ep) => (
          <li key={ep.id}>
            {ep.episode} - {ep.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetailsPage;
