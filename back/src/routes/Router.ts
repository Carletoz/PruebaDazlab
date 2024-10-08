import { Router } from "express";
import { createPokemon, deletePokemon, getPokemonById, getPokemonByName, getPokemons, updatePokemon, getPokemonImg } from "../controllers/pokemonsController";

const router = Router()

router.get("/pokemon", getPokemons)
router.get("/pokemon/img/:name", getPokemonImg)
router.get("/pokemon/name/:name", getPokemonByName)
router.get("/pokemon/:id", getPokemonById)
router.post("/pokemon",createPokemon)
router.put("/pokemon/update",updatePokemon)
router.delete("/pokemon/:name",deletePokemon)


export default router;
