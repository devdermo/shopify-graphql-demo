import "dotenv/config";
import { fetchAndDisplayProducts } from "./utils/api.js";
async function main() {
    const permittedOptions = ["-name"];
    const [, , option, value] = process.argv;
    if (!permittedOptions.includes(option)) {
        console.error(`Invalid CLI usage.\nnode src/app.ts ${permittedOptions.join(" | ")} <search-term>`);
        process.exit(1);
    }
    try {
        await fetchAndDisplayProducts(value || "");
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
main();
