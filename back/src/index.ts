import server from "./server";
import { PORT } from "./config/envs";
import dbCon from "./config/dbCon";

dbCon()
.then(res => {
  console.log("Connected to the database");
})
.then (res => server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}))
.catch((error) => {
  console.error("Error connecting to the database", error);
});

