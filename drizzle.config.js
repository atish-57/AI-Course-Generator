/** @type { import("drizzle-kit").Config } */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
console.log(process.env.NEXT_PUBLIC_DB_CONNECTION_STRING)
export default {
  schema: "./configs/Schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
    
  }
};
