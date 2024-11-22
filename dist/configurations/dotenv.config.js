import dotenv from "dotenv";
import path from "path";
const dotenvPath = path.join(process.cwd(), ".env");
dotenv.config({ path: dotenvPath });
export const dotenvConfigurations = {
    port: process.env.PORT,
    mongodb_connection_string: process.env.MONGODB_CONNECTION_STRING,
};
