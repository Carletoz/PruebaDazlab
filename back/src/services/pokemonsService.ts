import CreatePokemonDto from "../dto/createPokemonDto";
import Pokemon from "../models/Pokemon";

export const getPokemonsService = async () => {
  try {
    const pokemonsDB = await Pokemon.find();

    if (pokemonsDB.length > 0) {
      return pokemonsDB;
    } else {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
      const data = (await response.json()) as { results: any[] };
      const pokemons = data.results;

      for (const pokemon of pokemons) {
        const pokemonDetailsResponse = await fetch(pokemon.url);
        const pokemonDetails = (await pokemonDetailsResponse.json()) as {
          types: { type: { name: string } }[];
        };
        const types = pokemonDetails.types.map(
          (typeInfo) => typeInfo.type.name
        );

        const newPokemon = new Pokemon({
          name: pokemon.name,
          url: pokemon.url,
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
