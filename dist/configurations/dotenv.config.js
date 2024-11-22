import dotenv from "dotenv";
import path from "path";
const dotenvPath = path.join(process.cwd(), ".env");
console.log(dotenvPath);
dotenv.config({ path: dotenvPath });
export const dotenvConfigurations = {
    port: process.env.PORT,
};
