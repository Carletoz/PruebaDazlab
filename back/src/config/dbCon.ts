import mongoose from "mongoose";
import { DB_URI } from "../config/envs";

const dbCon = async () => {
  await mongoose.connect(`${DB_URI}`);
};

// const dbCon = async () => {
//   try {
//     const connection = await mongoose.connect(`${DB_URI}`);
//     const db:any = connection.connection.db;

//     // Eliminar todas las colecciones
//     const collections = await db.collections();
//     for (let collection of collections) {
//       await collection.drop();
//     }

//     console.log("Todas las colecciones han sido eliminadas.");
//   } catch (error) {
//     console.error("Error al conectar o limpiar la base de datos", error);
//   }
// };

export default dbCon;
 