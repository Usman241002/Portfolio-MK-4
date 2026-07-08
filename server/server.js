import app from "./app.js";
import { initDB } from "./database/helpers/database.js";

const PORT = 3000; //server listening on port 3000

//load up schema
await initDB();

//enabling the server to listen on port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`)
})
