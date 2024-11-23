import dotenv from "dotenv";
import path from "path";

// Load the .env file from the root of the project
const dotenvPath = path.join(process.cwd(), ".env");
dotenv.config({ path: dotenvPath });

// Export the configurations
export const dotenvConfigurations = {
  port: process.env.PORT,
  mongodb_connection_string: process.env.MONGODB_CONNECTION_STRING,
};
