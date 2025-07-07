import { bootstrap } from "./api/api.bootstrap.ts";
import type { ApiConfig } from "./api/api.bootstrap.ts";

function main() {
  const config : ApiConfig = {  
    port: 3000,
  };
  try {
    bootstrap(config);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();