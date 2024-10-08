import { Request, Response } from "express";
import {
  createPokemonService,
  deletePokemonService,
  getPokemonByIdService,
  getPokemonByNameService,
  getPokemonImgService,
  getPokemonsService,
  updatePokemonService,
} from "../services/pokemonsService";
import Pokemon from "../models/Pokemon";

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const pokemons = await getPokemonsService();
    res.status(200).json(pokemons);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPokemonImg = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const pokemon = await getPokemonImgService(name);
    res.status(200).json(pokemon);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPokemonByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const pokemon = await getPokemonByNameService(name);
    res.status(200).json(pokemon);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPokemonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pokemon = await getPokemonByIdService(id);
    res.status(200).json(pokemon);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const createPokemon = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;
    const pokemon = await createPokemonService({ name, type });
    res.status(200).json(pokemon);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
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
