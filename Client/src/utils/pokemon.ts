import axios from "axios";

export interface PokemonData {
  name: string;
  image: string;
}

export const getRandomPokemon = async (): Promise<PokemonData | null> => {
  const randomArray = new Uint16Array(1);
  crypto.getRandomValues(randomArray);
  const randomId = (randomArray[0] % 1000) + 1;

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const pokemon = response.data;

    const computedImage =
      pokemon.sprites?.other?.dream_world?.front_default ||
      pokemon.sprites?.front_default ||
      pokemon.sprites?.back_default ||
      pokemon.sprites?.front_shiny ||
      pokemon.sprites?.back_shiny;

    if (!computedImage) {
      return null;
    }

    return {
      name: pokemon.name,
      image: computedImage,
    };
  } catch {
    return null;
  }
};
