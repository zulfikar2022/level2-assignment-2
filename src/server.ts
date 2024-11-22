import mongoose from "mongoose";
import { app } from "./app.js";
import { dotenvConfigurations } from "./configurations/dotenv.config.js";
import { CustomError } from "./bikes/bikes.error.js";

mongoose
  .connect(dotenvConfigurations.mongodb_connection_string as string)
  .then(() => {
    console.log("database connected successfully.");
    app.listen(dotenvConfigurations.port || 5000, () => {
      console.log(
        `The app is running on port ${dotenvConfigurations.port || 3000}`
      );
    });
  })
  .catch((error) => {
    throw new CustomError("Database Connection error", error, error.stack);
  });
