import React, { FC, useState } from "react";
import { Character } from "../hooks/useCharacters";
import { Link } from "react-router-dom";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      to={`/character/${character.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {!imgLoaded && (
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #ccc",
                borderTop: "4px solid #000",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
          )}
          <img
            src={character.image}
            alt={character.name}
            onLoad={() => setImgLoaded(true)}
            style={{
              display: imgLoaded ? "block" : "none",
              width: "100%",
              borderRadius: "8px",
            }}
          />
        </div>

        <h3 style={{ margin: "10px 0 5px 0" }}>{character.name}</h3>
        <p style={{ margin: 0 }}>
          {character.species} - {character.status}
        </p>

        {/* Inline keyframes */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </Link>
  );
};

export default CharacterCard;
