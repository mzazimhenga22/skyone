// create a test-env.ts file for debug
import "dotenv/config";

console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
console.log("SERVICE_ROLE_KEY =", process.env.SUPABASE_SERVICE_ROLE_KEY);
