import { Request, Response } from "express";
import {
  createPokemonService,
  deletePokemonService,
  getPokemonsService,
  updatePokemonService,
} from "../services/pokemonsService";

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const pokemons = await getPokemonsService();
    res.status(200).json(pokemons);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const createPokemon = async (req: Request, res: Response) => {
  try {
    const { name, url, type } = req.body;
    const pokemon = await createPokemonService({ name, url, type });
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ message: "Algo fallo al crear el pokemon" });
  }
};


export const updatePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, url, type } = req.body;
    const pokemon = await updatePokemonService(id, { name, url, type });
    res.status(200).json(pokemon);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Algo salio mal al actualizar el pokemon" });
  }
};


export const deletePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deletePokemonService(Number(id));
    res.status(200).json({ message: "Pokemon eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Algo salio mal " });
  }
};
