import { Router } from "express";
import { getPokemons } from "../controllers/pokemonsController";

const router = Router()

router.get("/pokemon", getPokemons)


export default router;
