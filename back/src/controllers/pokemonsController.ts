import { Request, Response } from "express";
import { getPokemonsService } from "../services/pokemonsService";

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const pokemons = await getPokemonsService();
    res.status(200).json(pokemons);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
