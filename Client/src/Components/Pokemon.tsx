import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { SkeletonLoadingBlock } from "./UI/SkeletonLoadingBlock";

const getRandomPokemon = async () => {
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
        <SkeletonLoadingBlock
          width={200}
          height={200}
          borderRadius={6}
          className="pokemon_img"
        />
      </PokemonDiv>
    );
  }

  return (
    <PokemonDiv>
      <img
        src={pokemon.image}
        alt={`pokemon: ${pokemon.name}`}
        className="pokemon_img"
      />
    </PokemonDiv>
  );
};

const PokemonDiv = styled.div`
  .pokemon_img {
    display: none;
    width: 200px;
    height: auto;

    @media (min-width: 992px) {
      display: block;
      position: relative;
      left: 75%;
      top: -2rem;
    }
  }
`;

export default Pokemon;
