import { Router } from "express";
import { createPokemon, deletePokemon, getPokemons, updatePokemon } from "../controllers/pokemonsController";

const router = Router()

router.get("/pokemon", getPokemons)
router.post("/pokemon",createPokemon)
router.put("/pokemon/:id",updatePokemon)
router.delete("/pokemon/:id",deletePokemon)


export default router;
