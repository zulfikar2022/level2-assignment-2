import { app } from "./app.js";
import { dotenvConfigurations } from "./configurations/dotenv.config.js";

app.listen(dotenvConfigurations.port || 5000, () => {
  console.log(
    `The app is running on port ${dotenvConfigurations.port || 3000}`
  );
});
