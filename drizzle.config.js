import { defineConfig } from "drizzle-kit";

const check = process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING;
console.log("DB", check);


export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING,
  },
});
