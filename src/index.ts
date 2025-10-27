import app from "./app";
import dotenv from "dotenv";
import { connectDatabase } from "./db/connectDb";

dotenv.config({
  path: "../.env",
});

const PORT = process.env.PORT || 3000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started and listening on port " + PORT);
    });
  })
  .catch((error) => {
    console.log("Database Connection failed.");
    console.log(error);
    process.exit(1);
  });
