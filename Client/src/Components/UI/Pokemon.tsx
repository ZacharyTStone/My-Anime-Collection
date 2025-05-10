import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SkeletonLoadingBlock } from ".";

export const getRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 1000) + 1;

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const pokemon = response.data;

    return {
      name: pokemon.name,
      image:
        pokemon.sprites.other.dream_world.front_default ||
        pokemon.sprites.front_default ||
        pokemon.sprites.back_default ||
        pokemon.sprites.front_shiny ||
        pokemon.sprites.back_shiny ||
        pokemon.sprites.other.dream_world.front_default, // Include SVG here
    };
  } catch (error) {
    console.error("Error fetching random pokemon:", error);
    return null;
  }
};

interface Pokemon {
  name: string;
  image: string;
}

const Pokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon>({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const newPokemon = await getRandomPokemon();
        if (newPokemon) {
          setPokemon(newPokemon);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading || !pokemon.image.length || !pokemon.name.length) {
    return (
      <PokemonDiv>
        <div className="pokemon-container loading">
          <SkeletonLoadingBlock
            width={150}
            height={150}
            borderRadius={75}
            className="pokemon-img"
          />
        </div>
      </PokemonDiv>
    );
  }

  return (
    <PokemonDiv>
      <div className="pokemon-container">
        <div className="pokemon-image-wrapper">
          <img
            src={pokemon.image}
            alt={`pokemon: ${pokemon.name}`}
            className="pokemon_img"
          />
        </div>
        <div className="pokemon-info">
          <span className="pokemon-title">Your Random Pokémon</span>
          <span className="pokemon-name">{pokemon.name}</span>
        </div>
      </div>
    </PokemonDiv>
  );
};

const PokemonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .pokemon-container {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--white);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: var(--shadow);
    border: 1px solid var(--grey-200);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
      border-color: var(--primary-200);
    }

    &.loading {
      min-height: 250px;
      justify-content: center;
    }
  }

  .pokemon-image-wrapper {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(212, 54, 124, 0.1),
      rgba(212, 54, 124, 0.05)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 2px solid var(--primary-100);
    box-shadow: var(--shadow-sm);
  }

  .pokemon_img {
    width: 130px;
    height: 130px;
    object-fit: contain;
  }

  .pokemon-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
  }

  .pokemon-title {
    font-size: 0.9rem;
    color: var(--grey-500);
    margin-bottom: 0.25rem;
  }

  .pokemon-name {
    color: var(--grey-900);
    font-weight: 600;
    text-transform: capitalize;
    font-size: 1.25rem;
    border-bottom: 2px solid var(--primary-200);
    padding-bottom: 0.25rem;
  }

  @media (max-width: 992px) {
    .pokemon-image-wrapper {
      width: 140px;
      height: 140px;
    }

    .pokemon_img {
      width: 110px;
      height: 110px;
    }
  }
`;

export default Pokemon;
