import { useEffect, useState } from "react";
import { SkeletonLoadingBlock } from ".";
import { getRandomPokemon, type PokemonData } from "../../utils/pokemon";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState<PokemonData>({
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
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-[400px] flex flex-col items-center bg-[var(--outline-button-background)] rounded-2xl p-6 shadow border border-grey-200 transition-all duration-300 min-h-[250px] justify-center">
          <SkeletonLoadingBlock
            width={150}
            height={150}
            borderRadius={75}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-[400px] flex flex-col items-center bg-[var(--outline-button-background)] rounded-2xl p-6 shadow border border-grey-200 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-md hover:border-primary-200">
        <div className="w-[160px] h-[160px] rounded-full flex items-center justify-center mb-4 p-2 border-2 border-primary-100 shadow-sm bg-gradient-to-br from-primary-500/10 to-primary-500/5 max-[992px]:w-[140px] max-[992px]:h-[140px]">
          <img
            src={pokemon.image}
            alt={`pokemon: ${pokemon.name}`}
            className="w-[130px] h-[130px] object-contain max-[992px]:w-[110px] max-[992px]:h-[110px]"
          />
        </div>
        <div className="flex flex-col items-center w-full text-center">
          <span className="text-[0.9rem] text-grey-500 mb-1">Your Random Pokémon</span>
          <span className="text-grey-900 font-semibold capitalize text-[1.25rem] border-b-2 border-primary-200 pb-1">
            {pokemon.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
