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

/**
 * @swagger
 * /pokemon:
 *   get:
 *     summary: Obtiene todos los Pokémon
 *     responses:
 *       200:
 *         description: Lista de Pokémon
 *       400:
 *         description: Error al obtener los Pokémon
 */
export const getPokemons = async (req: Request, res: Response) => {
  try {
    const pokemons = await getPokemonsService();
    res.status(200).json(pokemons);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /pokemon/img/{name}:
 *   get:
 *     summary: Obtiene la imagen de un Pokémon por nombre
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nombre del Pokémon
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Imagen del Pokémon
 *       400:
 *         description: Error al obtener la imagen del Pokémon
 */
export const getPokemonImg = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const pokemon = await getPokemonImgService(name);
    res.status(200).json(pokemon);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /pokemon/name/{name}:
 *   get:
 *     summary: Obtiene detalles de un Pokémon por nombre
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nombre del Pokémon
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del Pokémon
 *       400:
 *         description: Error al obtener el Pokémon
 */
export const getPokemonByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const pokemon = await getPokemonByNameService(name);
    res.status(200).json(pokemon);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /pokemon/{id}:
 *   get:
 *     summary: Obtiene detalles un Pokémon por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Pokémon
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del Pokémon
 *       400:
 *         description: Error al obtener el Pokémon
 */
export const getPokemonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pokemon = await getPokemonByIdService(id);
    res.status(200).json(pokemon);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /pokemon:
 *   post:
 *     summary: Crea un nuevo Pokémon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *             example:
 *              name: "nombreDePokemon"
 *              type: "tipoDePokemon"
 *     responses:
 *       200:
 *         description: Pokémon creado
 *       400:
 *         description: Error al crear el Pokémon
 */
export const createPokemon = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;
    const pokemon = await createPokemonService({ name, type });
    res.status(200).json(pokemon);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /pokemon/update:
 *   put:
 *     summary: Actualiza un Pokémon existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pokémon actualizado
 *       400:
 *         description: Error al actualizar el Pokémon
 */
export const updatePokemon = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;
    const pokemon = await updatePokemonService(name, type);
    res.status(200).json(pokemon);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /pokemon/{name}:
 *   delete:
 *     summary: Elimina un Pokémon por nombre
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nombre del Pokémon
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pokémon eliminado correctamente
 *       400:
 *         description: Error al eliminar el Pokémon
 */
export const deletePokemon = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    await deletePokemonService(name);
    res.status(200).json({ message: "Pokemon eliminado correctamente" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
