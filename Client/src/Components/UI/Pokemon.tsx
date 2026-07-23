import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SkeletonLoadingBlock } from ".";
import { getRandomPokemon, type PokemonData } from "../../utils/pokemon";

const Pokemon = () => {
  const { t } = useTranslation();
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

  if (loading) {
    return (
      <div className="mt-8 flex justify-center">
        <div className="flex min-h-[250px] w-full max-w-[400px] flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
          <SkeletonLoadingBlock width={150} height={150} borderRadius={75} />
        </div>
      </div>
    );
  }

  // The easter egg only earns its space when the sprite actually loaded
  if (!pokemon.image.length || !pokemon.name.length) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex w-full max-w-[400px] flex-col items-center rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-4 flex h-[160px] w-[160px] items-center justify-center rounded-full border border-border/70 bg-muted/60 p-2 shadow-sm max-[992px]:h-[140px] max-[992px]:w-[140px]">
          <img
            src={pokemon.image}
            alt={`pokemon: ${pokemon.name}`}
            className="h-[130px] w-[130px] object-contain max-[992px]:h-[110px] max-[992px]:w-[110px]"
          />
        </div>
        <div className="flex w-full flex-col items-center text-center">
          <span className="mb-1 text-[0.9rem] text-muted-foreground">{t("profile.random_pokemon")}</span>
          <span className="text-[1.25rem] font-semibold capitalize">
            {pokemon.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
