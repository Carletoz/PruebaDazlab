import mongoose, { Schema, model } from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const PokemonSchema = new Schema({
  _id: Number,
  name: String,
  type: [String], // Cambiado a un array de strings
  url: String,
}, { versionKey: false }); 
PokemonSchema.plugin(AutoIncrement, { inc_field: '_id' });

const Pokemon = model("Pokemon", PokemonSchema);

export default Pokemon;
