import app from "./app.js";
import { initDB } from "./database/helpers/database.js";

const PORT = 3000; //server listening on port 3000

//load up schema
await initDB();

//enabling the server to listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
