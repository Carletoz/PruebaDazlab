import CreatePokemonDto from "../dto/createPokemonDto";
import IPokemon from "../interfaces/Ipokemon";
import Pokemon from "../models/Pokemon";

export const getPokemonsService = async (): Promise<IPokemon[] | undefined> => {
  try {
    const pokemonsDB = await Pokemon.find();

    if (pokemonsDB.length > 0) {
      return pokemonsDB as IPokemon[];
    } else {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6");
      const data = (await response.json()) as { results: any[] };
      const pokemons = data.results; 

      for (const pokemon of pokemons) {
        const pokemonDetailsResponse = await fetch(pokemon.url);
        const pokemonDetails: PokemonDetails =
          (await pokemonDetailsResponse.json()) as any;
        const types = pokemonDetails.types.map(
          (typeInfo) => typeInfo.type.name
        );

        const pokemonImage: string | undefined =
          pokemonDetails.sprites?.other?.["official-artwork"]?.front_default;

        const newPokemon = new Pokemon({
          name: pokemon.name,
          url: pokemon.url,
          img: pokemonImage,
          type: types,
        });
        await newPokemon.save();
      }

      console.log("Pokemons guardados en la base de datos.");
      return await Pokemon.find();
    }
  } catch (error) {
    console.error("Error al guardar los pokemons:", error);
  }
};

export const getPokemonImgService = async (name: string) => {
  try {
    const pokemon: IPokemon | null = await Pokemon.findOne({ name });
    if (!pokemon) {
      throw new Error("Pokemon no encontrado");
    }
    return pokemon.img;
  } catch (error) {
    console.error("Error al obtener la imagen del Pokemon:", error);
    throw error;
  }
};

export const getPokemonByNameService = async (
  name: string
): Promise<IPokemon> => {
  try {
    const pokemon: IPokemon | null = await Pokemon.findOne({ name });
    if (!pokemon) {
      throw new Error("Pokemon no encontrado");
    } else {
      return pokemon;
    }
  } catch (error) {
    throw error;
  }
};

export const getPokemonByIdService = async (id: string) => {
  try {
    const pokemon: IPokemon | null = await Pokemon.findById(id);
    if (!pokemon) {
      throw new Error("Pokemon no encontrado");
    } else {
      return pokemon;
    }
  } catch (error: any) {
    throw error;
  }
};

export const createPokemonService = async (pokemon: CreatePokemonDto) => {
  try {
    if (pokemon.name && pokemon.url && pokemon.type) {
      const newPokemon = await Pokemon.create(pokemon);
      return newPokemon;
    } else {
      throw new Error("Todos los campos son requeridos");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updatePokemonService = async (
  id: string,
  pokemon: CreatePokemonDto
) => {
  try {
    const results = await Pokemon.findByIdAndUpdate(id, pokemon);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const deletePokemonService = async (id: number) => {
  try {
    const results = await Pokemon.findByIdAndDelete(id);
    return results;
  } catch (error) {
    console.log(error);
  }
};

interface PokemonDetails {
  types: { type: { name: string } }[];
  sprites?: {
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
    };
  };
}
