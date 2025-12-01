import React, { FC } from "react";
import { Character } from "../hooks/useCharacters";
import { Link } from "react-router-dom";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  return (
    <Link to={`/character/${character.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          textAlign: "center",
          width: "180px",
          margin: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={character.image}
          alt={character.name}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <h3 style={{ margin: "10px 0 5px 0" }}>{character.name}</h3>
        <p style={{ margin: 0 }}>
          {character.species} - {character.status}
        </p>
      </div>
    </Link>
  );
};

export default CharacterCard;
